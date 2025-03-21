'use client'
import { User } from "@supabase/auth-helpers-nextjs";
import { userDetails } from "../types";
import { Subscription } from "../types";
import { createContext, useEffect, useState,useContext } from "react";
import { useSessionContext ,useUser as useSupaUser} from "@supabase/auth-helpers-react";


type UserContextType = {
    accessToken:string | null;
    user:User | null;
    userDetails: userDetails | null;
    isLoading:boolean;
    subscribtion:Subscription | null;
}

export const UserContext = createContext<UserContextType | undefined>(undefined)

export interface Prop{
    [propName:string]:any
}

export const MyUserContextProvider = (prop:Prop) =>{
    const {
        session,
        isLoading:isLoadingUser,
        supabaseClient:supabase
    } = useSessionContext()

    const user = useSupaUser()
    const accessToken = session?.access_token ?? null;
    const [isLoadingData,setIsLoadingData] = useState(false)
    const [userDetails,setUserDetails] = useState<userDetails| null>(null)
    const [subscribtion,setSubscription] = useState<Subscription | null>(null)

    const getUserDatails = () => supabase.from('users').select('*').single()
    const getSubscriptions = () =>
    supabase
    .from('subscriptions')
    .select('*,prices(*,products(*))')
    .in('status',['trialing','active'])
    .single()

    useEffect(()=>{
       if(user && !isLoadingData && !userDetails && !subscribtion) {
           setIsLoadingData(true)
           Promise.allSettled([getUserDatails(),getSubscriptions()]).then(
            (results)=>{
                const userDetailsPromise = results[0];
                const subscriptionPromise = results[1];

                if(userDetailsPromise.status === 'fulfilled'){
                    setUserDetails(userDetailsPromise.value.data as userDetails)
                }
                if(subscriptionPromise.status === 'fulfilled'){
                    setSubscription(subscriptionPromise.value.data as Subscription)
                    console.log('This part works')
                }
                setIsLoadingData(false)
            }
           )
       } else if (!user && !isLoadingUser && !isLoadingData){
        setUserDetails(null)
        setSubscription(null)
       }
    },[user,isLoadingUser])

    const value = {
        accessToken,
        user,
        userDetails,
        isLoading:isLoadingUser || isLoadingData,
        subscribtion
    }

    return <UserContext.Provider value={value} {...prop}/>
}

export const useUser = () =>{
    const context = useContext(UserContext);
    if(context === undefined){
        throw new Error('useUser must be used within a MyUserContextProvider')
    }
    return context;
}
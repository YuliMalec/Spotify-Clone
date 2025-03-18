'use client'
import {useState,useEffect} from 'react'
import { useRouter } from "next/navigation"
import useSubscribeModal from "../../../../hooks/useSubscribeModal"
import { useUser } from "../../../../hooks/useUser"
import { postData } from '../../../../libs/helpers'
import toast from 'react-hot-toast'
import { Button } from '../../../../UI/Button'

export default function AccountContent() {
    const router = useRouter()
    const subscribeModal = useSubscribeModal()
    const{isLoading,user,subscribtion} = useUser()
    const [loading,setLoading] = useState<boolean>(false)

    useEffect(()=>{
   if(!user && !isLoading){
    router.replace('/')
   }
    },[isLoading,user,router])

    const redirectToCustomerPortal = async() =>{
        setLoading(true)
        try{
            const {url,error} = await postData({
             url:'/api/create-portal-link',
            })
            window.location.assign(url)
        } catch(error){
            if(error){
                toast.error((error as Error).message)
            }
        }
        setLoading(false)
    }
   
  return (
    <div className='mb-7 px-6'>
        {!subscribtion && (
            <div className='flex flex-col gap-y-4'>
                <p>No active plan</p>
                <Button
                onClick={subscribeModal.onOpen}
                className='w-[300px]'>Subscribe</Button>
            </div>
        )}
        {subscribtion && (
            <div className='flex flex-col gap-y-4'>
          <p>You are currently on the <b>{subscribtion?.prices?.products?.name} plan</b></p>
          <Button 
          className='w-[300px]'
          disabled={loading||isLoading}
          onClick={redirectToCustomerPortal}
          ></Button>
            </div>
        )}
    </div>
  )
}

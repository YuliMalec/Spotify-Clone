'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import {twMerge} from 'tailwind-merge'
import { RxCaretLeft,RxCaretRight } from 'react-icons/rx'
import { HiHome } from 'react-icons/hi2'
import { IoSearch } from "react-icons/io5";
import {FaUserAlt} from "react-icons/fa"
import { Button } from './Button'
import useAuthModal from '../hooks/useAuthModal'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useUser } from '../hooks/useUser'
import {toast} from 'react-hot-toast'
import usePlayer from '../hooks/usePlayer'

interface HeaderProp{
    children:React.ReactNode,
    className?:string
}

export const Header:React.FC<HeaderProp> = ({children,className}) => {
    const router = useRouter()
   
    const supabaseClient = useSupabaseClient()
    const {user} = useUser()
    const player = usePlayer()
    const {onOpen} = useAuthModal() 
    const handleLogout = async() =>{
      const {error} = await supabaseClient.auth.signOut()
      player.reset()
      router.refresh()

      if(error){
        toast.error(error.message)
      } else{
        toast.success('Logged out!')
      }
    }
  return (
    <div className={twMerge(`
    h-fit
    bg-gradient-to-b
    from-emerald-800
    p-6
    `,className)}
    >
        <div className='w-full
        mb-4
        flex
        items-center
        justify-between

        '>
          <div className='hidden
           md:flex
           gap-x-2
           items-center
           '>
            <button 
            onClick={()=>router.back()}
            className='
            rounded-full
            bg-black
            flex
            justify-center
            items-center
            hover:opacity-75
            transition
            '>
            <RxCaretLeft className='text-white'size={35}/>
            </button>
            <button 
             onClick={()=>router.forward()}
            className='
            rounded-full
            bg-black
            flex
            justify-center
            items-center
            hover:opacity-75
            transition
            '>
            <RxCaretRight className='text-white'size={35}/>
            </button>
           </div>
           <div className='flex md:hidden items-center gap-x-2'>
            <button className='
            rounded-full
            bg-white
            p-2
            flex
            items-center
            justify-center
            hover:opacity-75
            transition
            '>
                <HiHome className='text-black' size={20}/>
            </button>
            <button className='
            rounded-full
            bg-white
            p-2
            flex
            items-center
            justify-center
            hover:opacity-75
            transition
            '>
                <IoSearch className='text-black' size={20}/>
            </button>
           </div>
           <div className='
           flex
           justify-between
           items-center
           gap-x-4'>
            {user ? <div 
            className='flex gap-x-4 items-center'
            ><Button
            onClick={handleLogout}
            className='bg-white px-6 py-2'
            >Logout</Button>
            <Button
            onClick={()=>router.push('/account')}
            className='bg-white'>
              <FaUserAlt/>
            </Button>
            </div> :(
             <>
             <div>
                <Button 
                onClick={onOpen}
                className='bg-transparent
                text-neutral-300
                font-medium'>
                    Sing up
                    </Button>
             </div>
             <div>
                <Button 
                onClick={onOpen}
                className='bg-white
                px-6
                py-2'>
                   Log in
                    </Button>
             </div>
             </>)}
           </div>
        </div>
        {children}
    </div>
  )
}

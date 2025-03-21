'use client'
import React from 'react'
import { TbPlaylist } from 'react-icons/tb'
import { AiOutlinePlus } from 'react-icons/ai'
import useAuthModal from '../hooks/useAuthModal'
import { useUser } from '../hooks/useUser'
import useUplpadModal from '../hooks/useUploadModal'
import { Song } from '../types'
import {MediaItem} from './MediaItem'
import useOnPlay from '../hooks/useOnPlay'
import useSubscriptionModal from '../hooks/useSubscribeModal'
import toast from 'react-hot-toast'

interface LibrabraryProps{
  songs:Song[]
}

export const Library:React.FC<LibrabraryProps> = ({songs}) => {
  
 const uploadModal = useUplpadModal()
 const {user} = useUser()
  const onPlay = useOnPlay(songs)
  const onClick = ()=>{
    if(!user){
      return toast.error('Sign in at first!')
    }
    uploadModal.onOpen()
  }
  
  return (
    <div className='flex flex-col'>
        <div className='
        flex
        items-center
        justify-between
        px-5
        pt-4'>
        <div 
        className='
        inline-flex
        items-center
        gap-x-2
        '> 
         <TbPlaylist size={26} 
         className='text-neutral-400'/>
         <p className='
         text-neutral-400 
         font-medium
          text-md'>Library</p>
         </div>
         <AiOutlinePlus
         onClick={onClick}
         size={20}
         className='
         text-neutral-400
        cursor-pointer
        hover:text-white
        transition'
         />
        </div>
        <div className='
        flex
        flex-col
        gap-y-2
        pt-3
        px-3
        '>
       {songs.map((item)=>(
        <MediaItem item={item}
        key={item.id}
        onClick={(id:string)=>onPlay(id)}/>
       ))}
        </div>
    </div>
  )
}

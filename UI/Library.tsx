'use client'
import React from 'react'
import { TbPlaylist } from 'react-icons/tb'
import { AiOutlinePlus } from 'react-icons/ai'

export const Library = () => {
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
       List of songs!
        </div>
    </div>
  )
}

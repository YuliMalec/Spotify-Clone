'use client'
import React from 'react'
import { Song } from '../types'
import useLoadImage from '../hooks/useLoadImage';
import Image from 'next/image';

interface MediaItemProps{
    item:Song;
    onClick?:(id:string)=>void
}

export const MediaItem:React.FC<MediaItemProps> = ({item,onClick}) =>{
    const imageURL = useLoadImage(item)

    const handleClick = ()=>{
        if(onClick){
            return onClick(item.id)
        }
        //TODO default turn on player
    }
  return (
    <div onClick={handleClick}
    className='
    flex
    items-center
    gap-x-3
    cursor-pointer
    hover:bg-netral-800/50
    w-full
    p-2
    rounded-md
    '>
        <div className='
        relative
        rounded-md
        min-h-[48px]
        min-w-[48px]
        overflow-hidden
        '>
        <Image 
        fill
        src={imageURL || 'file.svg'}
        alt='Media Item'
        className='object-cover'/>
        </div>
        <div className='
        flex
        flex-col
        overflow-hidden
        gap-y-1'>
            <p className='text-white truncate'>{item.title}</p>
            <p className='text-neutral-400 text-sm truncate'>{item.author}</p>
        </div>
    </div>
  )
}

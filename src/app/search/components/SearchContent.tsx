'use client'
import React from 'react'
import { Song } from '../../../../types'
import { MediaItem } from '../../../../UI/MediaItem'
import { LikedButton } from '../../../../UI/LikedButton'
import useOnPlay from '../../../../hooks/useOnPlay'

interface SearchContentProps{
  songs:Song[]
}

export const SearchContent:React.FC<SearchContentProps> = ({songs}) =>{

  const onPlay = useOnPlay(songs)
  if(songs.length === 0){
    return <div className='
    flex
    flex-col
    gap-y-2
    w-full
    px-6
    text-neutral-400
    '>
      No songs found.
    </div>
  }
  return (
    <div 
    className='
    flex
    flex-col
    gap-y-2
    w-full
    px-6'>
      {songs.map((song:Song)=>(
        <div key={song.id}
        className='flex items-center gap-x-4 w-full'>
          <div className='flex-1'>
            <MediaItem 
            item={song}
            onClick={(id:string)=>onPlay(id)}
            />
          </div>
         <LikedButton songId = {song.id}/>
        </div>
      ))}
    </div>
  )
}

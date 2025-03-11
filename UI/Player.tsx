'use client'
import React from 'react'
import usePlayer from '../hooks/usePlayer'
import useGetSongsById from '../hooks/useGetSongsById'
import useLoadSong from '../hooks/useLoadSong'
import {PlayerContent} from './PlayerContent'
export default function Player() {
    const player = usePlayer()
    const {song} = useGetSongsById(player.activeId)

    const songUrl= useLoadSong(song!)

    if(!song || !songUrl || !player.activeId){
      return null;
    }

  return (
    <div className='
    fixed
    bottom-0
    bg-black
    w-full
    py2
    h-[80px]
    px-4'>
       <PlayerContent 
       key={songUrl}
       song={song}
       songUrl={songUrl}/>
    </div>
  )
}

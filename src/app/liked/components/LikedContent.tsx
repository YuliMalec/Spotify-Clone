'use client'
import {useEffect} from 'react'
import { useRouter } from "next/navigation"
import { Song } from "../../../../types"
import { useUser } from "../../../../hooks/useUser"
import { MediaItem } from '../../../../UI/MediaItem'
import { LikedButton } from '../../../../UI/LikedButton'
import useOnPlay from '../../../../hooks/useOnPlay'

interface LikedContentProps{
    songs:Song[]
}

export const LikedContent:React.FC<LikedContentProps> = ({songs}) =>{
   /* const router = useRouter()
    const {isLoading,user} = useUser()
    
    useEffect(() => {
        if(!isLoading && !user){
            router.replace('/')
        }
    
    }, [isLoading,user,router])*/
const onPlay = useOnPlay(songs)
    if(songs.length === 0){
        return <div className='
        flex
        flex-col
        gap-y-2
        w-full
        px-6
        text-neutral-400'>No liked songs.</div>
    }
    
  return (
    <div className='flex flex-col gap-y-2 w-full p-6'>
        {songs.map((song)=>(
            <div key={song.id}
            className='flex items-center gap-x-4 w-full'>
                <div className='flex-1 flex flex-row'>
                    <MediaItem item={song} onClick={(id:string)=>onPlay(id)}/>
                    <LikedButton songId={song.id}/>
                </div>
            </div>
        ))}
    </div>
  )
}

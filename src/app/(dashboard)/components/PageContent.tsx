'use client'
import useOnPlay from "../../../../hooks/useOnPlay"
import { Song } from "../../../../types"
import { SongItem } from "../../../../UI/SongItem"

interface PageContentProps{
    songs:Song[]
}

export const  PageContent:React.FC<PageContentProps> = ({songs}) => {
    if(songs.length === 0){
        return <div className="mt-4 text-neutral-400">
          No songs available.
        </div>
    }

    const onPlay  = useOnPlay(songs)
  return (
    <div className="
    grid
    grid-cols-2
    sm:grid-cols-3
    md:grid-cols-3
    lg:grid-cols-4
    xl:grid-cols-5
    2xl:grid-cols-8
    gap-4
    mt-4">
        {songs.map((item)=>(
            <SongItem 
            key={item.id}
            onClick={(id:string)=>onPlay(id)}
            data={item}/>
        ))}
    </div>
  )
}

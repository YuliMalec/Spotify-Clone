import React from 'react'
import getSongsByTitle from '../../../actoins/getSongsByTitle'

interface SearchProps{
    searchParams:{
        title:string
    }
}

 const  page:React.FC<SearchProps> = async({searchParams}:SearchProps) =>{
    const songs = await getSongsByTitle(searchParams.title)
  return (
    <div>page</div>
  )
}
export default page;

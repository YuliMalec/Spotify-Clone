'use client'
import {useState,useEffect} from 'react'
import { useSessionContext } from "@supabase/auth-helpers-react"
import { useRouter } from "next/navigation"
import useAuthModal from "../hooks/useAuthModal"
import { useUser } from "../hooks/useUser"
import {AiFillHeart,AiOutlineHeart} from 'react-icons/ai'
import toast from 'react-hot-toast'
interface LikedButtonProps{
    songId:string
}

export const LikedButton:React.FC<LikedButtonProps> = ({songId}) =>{
    const router = useRouter()
    const {supabaseClient} = useSessionContext()
    const authModal = useAuthModal()
    const {user} = useUser()
    const [isLiked,setIsLiked] = useState(false)

    useEffect(() => {
     if(!user?.id){
        return
     }

     const fetchData =async () => {
        const {data,error} = await supabaseClient
        .from('liked_songs')
        .select('*')
        .eq('user_id',user.id)
        .eq('song_id', songId)
        .single()
      if(!error && data){
        setIsLiked(true)
      }
     }
     fetchData()
    }, [songId,supabaseClient,user?.id])
    const Icon = isLiked ? AiFillHeart : AiOutlineHeart;

    const handleLike = async()=>{
       if(!user){
        return authModal.onOpen()
       }
       if(isLiked){
        const {error} = await supabaseClient
        .from('liked_songs')
        .delete()
        .eq('user_id',user?.id)
        .eq('song_id',songId)

        if(error){
            toast.error(error.message)
        } else{
            setIsLiked(false)
        }
       } else{
        const {error} = await supabaseClient
        .from('liked_songs')
        .insert({
            user_id:user.id,
            song_id:songId
        })
        if(error){
            toast.error(error.message)
        }else{
            setIsLiked(true)
            toast.success('Liked!')
        }
       }
       router.refresh()
    }
  return (
    <button 
    className='
    hover:opacity-75
    transition
    '
    onClick={handleLike}>
        <Icon size={25} color={isLiked ? '#22c55e':'white'}/>
    </button>
  )
}

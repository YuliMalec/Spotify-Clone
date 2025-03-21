import { Song } from "../types";
import useAuthModal from "./useAuthModal";
import usePlayer from "./usePlayer";
import useSubscribeModal from './useSubscribeModal';
import { useUser } from "./useUser";


const useOnPlay = (songs:Song[])=>{
    const player = usePlayer()
    const authModal = useAuthModal()
    const subscribeModal = useSubscribeModal()
    const {user,subscribtion} = useUser()

    const onPlay = (id:string)=>{
        if(!user){
            return authModal.onOpen()
        }
        
        player.setId(id)
        player.setIds(songs.map((song)=>song.id))
    }

    return onPlay;
}

export default useOnPlay;
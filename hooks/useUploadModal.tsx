import {create} from 'zustand'

interface UplpadModalStore{
    isOpen:boolean;
    onOpen:()=>void;
    onClose:()=>void;
}

const useUplpadModal = create<UplpadModalStore>((set)=>({
isOpen:false,
onOpen:()=>set({isOpen:true}),
onClose:()=>set({isOpen:false})

}))

export default useUplpadModal;
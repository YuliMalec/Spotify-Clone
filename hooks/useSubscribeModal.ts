import {create} from 'zustand'

interface SubscribeModalProp{
    isOpen:boolean;
    onOpen:()=>void;
    onClose:()=>void;
}

const useSubscribeModal = create<SubscribeModalProp>((set)=>({
isOpen:false,
onOpen:()=>set({isOpen:true}),
onClose:()=>set({isOpen:false})

}))

export default useSubscribeModal;
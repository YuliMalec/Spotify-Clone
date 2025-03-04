'use client'
import { useForm,FieldValues,SubmitHandler } from "react-hook-form"
import { useState } from "react"

import useUplpadModal from "../hooks/useUploadModal"
import Modal from "./Modal"
import Input from "./Input"
import { Button } from "./Button"
const UploadModal = () =>{
    const [isLoading,setIsLoading] = useState()
    const uploadModal = useUplpadModal()
   const {register,handleSubmit,reset} = useForm<FieldValues>({
    defaultValues:{
        autor:'',
        title:'',
        song:null,
        image:null
    }
   })
    const onChange = (open:boolean)=>{
        if(!open){
            reset()
            uploadModal.onClose()
        }
    }

    const onSubmit:SubmitHandler<FieldValues> = async(values) =>{
        //upload a supabase
    }
    return(
        <Modal
        title='Add a song'
        description="upload an mp3 file"
        isOpen={uploadModal.isOpen}
        onChange={onChange}>
    <form 
    onSubmit={handleSubmit(onSubmit)}
    className="flex flex-col gap-y-4">
    <Input  
    id='title'
    disabled={isLoading}
    {...register('title',{required:true})}
    placeholder='Song title'
    />
    <Input  
    id='author'
    disabled={isLoading}
    {...register('author',{required:true})}
    placeholder='Song author'
    />
    <div>
        <div className="pb-1">Select a song</div>
    <Input  
    id='song'
    type="file"
    disabled={isLoading}
    accept=".mp3"
    {...register('song',{required:true})}
    
    />
    </div>
    <div>
        <div className="pb-1">Select an image</div>
    <Input  
    id='image'
    type="file"
    disabled={isLoading}
    accept="image/*"
    {...register('image',{required:true})}
    
    />
    </div>
    <Button disabled={isLoading} type="submit">Create</Button>
    </form>
        </Modal>
    )
}

export default UploadModal
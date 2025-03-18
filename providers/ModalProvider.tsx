'use client'

import React,{useState,useEffect} from 'react'

import AuthModal from '../UI/AuthModal'
import UploadModal from '../UI/UploadModal'
import {SubscribeModal} from '../UI/SubscribeModal'
import { ProductWithPrice } from '../types'


interface ModalProviderProps{
  products:ProductWithPrice[]
}
export const ModalProvider:React.FC<ModalProviderProps> = ({
  products
}) => {


    const [isMounted,setIsMounted] = useState(false)

    useEffect(() => {
    setIsMounted(true)
    }, [])
    if(!isMounted){
        return null;
    }
  return (
    <>
    <UploadModal/>
     <AuthModal/>
     <SubscribeModal products={products}/>
     </>
  )
}

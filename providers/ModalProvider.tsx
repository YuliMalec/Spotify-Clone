'use client'

import React,{useState,useEffect} from 'react'

import AuthModal from '../UI/AuthModal'

export default function ModalProvider() {


    const [isMounted,setIsMounted] = useState(false)

    useEffect(() => {
    setIsMounted(true)
    }, [])
    if(!isMounted){
        return null;
    }
  return (
    <>
     <AuthModal/>
     </>
  )
}

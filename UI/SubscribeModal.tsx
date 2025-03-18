'use client'

import React, { useState } from 'react'
import Modal from './Modal'
import { Button } from './Button'
import { Price, ProductWithPrice } from '../types'
import { useUser } from '../hooks/useUser'
import toast from 'react-hot-toast'
import { postData } from '../libs/helpers'
import { getStripe } from '../libs/stripeClient'
import useSubscriptionModal from '../hooks/useSubscribeModal'

interface SubscribeModalProps{
products:ProductWithPrice[]
}

const FormatPrice = (price:Price)=>{
    const priceString = new Intl.NumberFormat('en-US',{
        style:'currency',
        currency:price.currancy,
        minimumFractionDigits:0,
    }).format((price?.unit_amount ||0)/100)

    return priceString;
}
export const SubscribeModal:React.FC<SubscribeModalProps> = ({
    products
}) =>{
  const subscribeModal = useSubscriptionModal()
  const {user,isLoading,subscribtion} = useUser()
  const [priceIdLoading,setPriceIsLoading] = useState<string>()
  const handleCheckout = async(price:Price)=>{
 setPriceIsLoading(price.id)

 if(!user){
  setPriceIsLoading(undefined)
  return toast.error('Must be logged in.')
 }

 if(subscribtion){
  setPriceIsLoading(undefined)
  return toast.error('Already subscribed.')
 }
 try{
   const {sessionId} = await postData({
    url:'/api/create-checkout-session',
    data:{price}
   })

   const stripe = await getStripe()
   stripe?.redirectToCheckout({sessionId})
 }catch(error){
  console.log(error)
  toast.error((error as Error)?.message)
 } finally {
  setPriceIsLoading(undefined)
 }
  }

  const onChange = (open:boolean)=>{
    if(!open){
      subscribeModal.onClose()
    }
  }
    let content  = (
        <div className='text-center'>
            No product available.
            
        </div>  
    )
     
    if(products.length){
     
            content = (
                <div>
                    {products.map((product)=>{
                        
                            if(!product.prices?.length){
                              return ( 
                                <div key={product.id}>
                                  No prices available.
                                  
                                </div>
                              ) 
                            } 
                            return product.prices.map((price)=>(
                                <Button 
                                key={price.id}
                                onClick={()=>handleCheckout(price)}
                                disabled={isLoading || price.id===priceIdLoading}
                                className='mb-4'>
                                  {`Subscribe for ${price.products?.name} a ${price.interval}`}
                                </Button>
                            ))
                       
                        })}
                </div>
            )
        }

        if(subscribtion){
          content = (
            <div className='text-center'>
              Already subscribed.
            </div>
          )
        }
  return (
    <Modal 
    title='Only for premium users.'
    description='Listen to music with Spotify Premium.'
    isOpen={subscribeModal.isOpen}
    onChange={onChange}>
  {content}
    </Modal>
  )
}

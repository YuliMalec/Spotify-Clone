import Stripe from "stripe";
import { NextResponse } from "next/server";
import { headers } from "next/headers";

import {stripe} from '@/../libs/stripe';
import {
 upsertPriceRecord,
 upsertProductRecord,
 manageSubscriptionStatusChange
} from '@/../libs/supabaseAdmin'

const relaventEvents = new Set([
    'product.created',
    'product.updated',
    'price.created',
    'price.updated',
    'checkout.session.completed',
    'customer.subscription.created',
    'customer.subscription.updated',
    'customer.subscription.deleted'
]
)

export async function POST(request:Request){
    const body = await request.text()
    const sig =  (await headers()).get('Stripe-Signature')

    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    let event:Stripe.Event;

    try{
        if(!sig || !webhookSecret) {
            console.log('No sig or no webhooks')
            return
        };
        event = stripe.webhooks.constructEvent(body,sig,webhookSecret)
    } catch (error:any){
  console.log('Error message: ' + error.message)
  return new NextResponse(`Webhook Error: ${error.message}` ,{status:400})
    }

    if(relaventEvents.has(event.type)){
        try{
            switch(event.type){
                case 'product.created':
                case 'product.updated':
                    await upsertProductRecord(event.data.object as Stripe.Product)
                    break;
                case 'price.created':
                case 'price.updated':
                    await upsertPriceRecord(event.data.object as Stripe.Price) 
                    break;
                case 'customer.subscription.created':
                case 'customer.subscription.updated' :
                case 'customer.subscription.deleted' :
                    const subscribtion = event.data.object as Stripe.Subscription;
                    await manageSubscriptionStatusChange(
                        subscribtion.id,
                        subscribtion.customer as string,
                        event.type === 'customer.subscription.created'
                    );
                    break;
                case 'checkout.session.completed':
                    const checkoutSession = event.data.object as Stripe.Checkout.Session;
                    if(checkoutSession.mode === 'subscription'){
                        const subscribtionId = checkoutSession.subscription;
                        await manageSubscriptionStatusChange(
                            subscribtionId as string,
                            checkoutSession.customer as string,
                            true
                        );
                       
                    } 
                     break;        
                  default:
                    throw new Error('Unhandled relevant event!')                 
            } 
        }catch(error){
         console.log(error)
         return new NextResponse('Webhook Error.',{status:400})
            }
    }

    return NextResponse.json({received:true},{status:200} )
} 
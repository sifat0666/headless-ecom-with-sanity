import { NextApiRequest, NextApiResponse } from "next";

import Stripe from 'stripe'

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY as string, {apiVersion: "2020-08-27"})


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // console.log('items', req.body)
    try {

      // const params = {
      //   submit_type: 'pay',
      //   mode: 'payment',
      //   payment_method_types: ['card'],
      //   billing_address_collection: 'auto',
      //   shipping_options:[
      //       {shipping_rate: 'shr_1LMp1aKFcbXFZy14fTq3igrV'},
      //       {shipping_rate: 'shr_1LMp2YKFcbXFZy14B7qi2gAP'}
      //   ],
      //   line_items: req.body.map()((item: any) => {
      //     const img = item.image[0].asset._ref;
      //     const newImage = img.replace('image-', 'https://cdn.sanity.io/images/drumtrcc/production/').replace('-webp', '.webp');
          
      //     return {
      //       price_data: { 
      //         currency: 'usd',
      //         product_data: { 
      //           name: item.name,
      //           images: [newImage],
      //         },
      //         unit_amount: item.price * 100,
      //       },
      //       adjustable_quantity: {
      //         enabled:true,
      //         minimum: 1,
      //       },
      //       quantity: item.quantity
      //     }
      //   }),


      //   // mode: 'payment',
      //   success_url: `${req.headers.origin}/?success=true`,
      //   cancel_url: `${req.headers.origin}/?canceled=true`,
      //   }




      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create({
        submit_type: 'pay',
        mode: 'payment',
        payment_method_types: ['card'],
        billing_address_collection: 'auto',
        shipping_options:[
            {shipping_rate: 'shr_1LMp1aKFcbXFZy14fTq3igrV'},
            {shipping_rate: 'shr_1LMp2YKFcbXFZy14B7qi2gAP'}
        ],
        line_items: req.body.map()((item: any) => {
          const img = item.image[0].asset._ref;
          const newImage = img.replace('image-', 'https://cdn.sanity.io/images/drumtrcc/production/').replace('-webp', '.webp');
          
          return {
            price_data: { 
              currency: 'usd',
              product_data: { 
                name: item.name,
                images: [newImage],
              },
              unit_amount: item.price * 100,
            },
            adjustable_quantity: {
              enabled:true,
              minimum: 1,
            },
            quantity: item.quantity
          }
        }),


        // mode: 'payment',
        success_url: `${req.headers.origin}/?success=true`,
        cancel_url: `${req.headers.origin}/?canceled=true`,
        }); 

        console.log('session', session)

      res.status(200).json(session);
    } catch (err: any) {
      // res.status(err.statusCode || 500).json(err.message);
      console.log(err)
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
import { NextApiRequest, NextApiResponse } from 'next';
// import stripe from 'stripe'
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

import Cors from 'cors'

const cors = Cors({
  origin: [
    'http://localhost:3000',
    'https://checkout.stripe.com'
  ]
})


function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: Function
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}



export default async function handler(req: NextApiRequest, res: NextApiResponse){
  if (req.method === 'POST') {
      const params = {
        submit_type: 'pay',
        mode: 'payment',
        payment_method_types: ['card'],
        billing_address_collection: 'auto',
        shipping_options: [
          {shipping_rate: 'shr_1LMp2YKFcbXFZy14B7qi2gAP'},
          {shipping_rate: 'shr_1LMp1aKFcbXFZy14fTq3igrV'}
        ],
        line_items: req.body.map((item: any) => {
          const img = item.image[0].asset._ref;
          const newImage = img.replace('image-', 'https://cdn.sanity.io/images/vfxfwnaw/production/').replace('-webp', '.webp');

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
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}`,
      }


      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create(params);
      
      res.json(session.url);

  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
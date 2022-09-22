import React from 'react'
import { AiOutlineLeft, AiOutlineMinus, AiOutlinePlus, AiOutlineShopping } from 'react-icons/ai'
// import { useCartContext } from '../context/CartContext'
import Link from 'next/link'
import { urlFor } from '../lib/client'
import { TiDeleteOutline } from 'react-icons/ti';
import { getStripe } from '../lib/getStripe'
import toast from 'react-hot-toast'
import { useStateContext } from '../context/stateContext';
import axios from 'axios'
import { useRouter } from 'next/router';

const Cart = () => {

  const router = useRouter()

  // const cartRef = useRef()

  const {
    onAdd,
    items,
    totalQuantity,
    toggleQuantity,
    onRemove,
    showCart,
    setShowCart,
    totalPrice
   } = useStateContext()

   const handleCheckOut = async () =>{
    const stripe = await getStripe()
    toast.loading('Processing...')
    const response = await fetch('http://localhost:3000/api/stripe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(items)

    })
    const data = await response.json()

    router.push(data)

   }
  

  return (
    <div>
      <div className="cart-wrapper" >
        <div className="cart-container" >
          <button type='button' className='cart-heading' onClick={()=> setShowCart(false)}>
            <AiOutlineLeft />
            <span className='heading'>Your Cart</span>
            <span className="cart-num-items">({totalQuantity} items)</span>
          </button>
          
          {
          
          items!.length < 1 && (
            <div className="empty-cart">
              <AiOutlineShopping size={150} />
              <h3>Your cart is empty</h3>
              <Link href='/'>
                <button type='button' onClick={()=>setShowCart(false)} className='btn'>
                  Continue Shopping

                </button>
              </Link>
            </div>
          )}


          <div className="product-container">
            {items!.length >= 1 && items!.map((item: any) => (
              <div className="product" key={item._id}>
                <img src={urlFor(item.image[0]).url()} className='cart-product-image' />
                <div className="item-desc">
                  <div className="flex top">
                    <h5>{item.name}</h5>
                    <h4>{item.price}</h4>
                  </div>
                  <div className="flex bottom">
                    <div>
                      <p className="quantity-desc">
                        <span className="minus" onClick={()=>toggleQuantity(item, -1)}><AiOutlineMinus /></span>
                        <span className="num">{item.quantity}</span>
                        <span className="plus" onClick={()=> toggleQuantity(item, 1)}><AiOutlinePlus /></span>
                      </p>
                    </div>
                    <button className='remove-item' onClick={()=>{onRemove(item)}}>
                      <TiDeleteOutline />
                    </button>
                  </div>
                </div>
              </div>
            )) }
          </div>
          {items!.length >= 1 && (
            <div className="cart-bottom">
              <div className="total">
                <h3>SubTotal:</h3>
                <h3>{totalPrice}</h3>
              </div>
              <div className="btn-container">
                <button className="btn" onClick={handleCheckOut}>
                  Pay
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Cart
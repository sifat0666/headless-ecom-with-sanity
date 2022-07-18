import React from 'react'
import { AiOutlineLeft, AiOutlineMinus, AiOutlinePlus, AiOutlineShopping } from 'react-icons/ai'
import { useStateContext } from '../context/stateContext'
import Link from 'next/link'
import { urlFor } from '../lib/client'
import { TiDeleteOutline } from 'react-icons/ti';
import { getStripe } from '../lib/getStripe'
import toast from 'react-hot-toast'

const Cart = () => {

  // const cartRef = useRef()

  const {totalPrice, totalQuantities, setShowCart, cartItems, toggleCartItemQuantity } = useStateContext()
  
  const handleCheckout = async () => {
    const stripe = await getStripe();

    const response = await fetch('/api/stripe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cartItems),
    });

    if(response.status === 500) return;

    
    const data = await response.json();

    toast.loading('Redirecting...');

    console.log('data', data)
    console.log('data.id', data.id)

    stripe.redirectToCheckout({ sessionId: data.id });
  }


  return (
    <div>
      <div className="cart-wrapper" >
        <div className="cart-container" >
          <button type='button' className='cart-heading' onClick={()=> setShowCart(false)}>
            <AiOutlineLeft />
            <span className='heading'>Your Cart</span>
            <span className="cart-num-items">({totalQuantities} items)</span>
          </button>
          
          {
          
          cartItems.length < 1 && (
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
            {cartItems.length >= 1 && cartItems.map((item: any) => (
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
                        <span className="minus" onClick={()=>toggleCartItemQuantity(item._id, 'dec')}><AiOutlineMinus /></span>
                        <span className="num">{item.quantity}</span>
                        <span className="plus" onClick={()=>toggleCartItemQuantity(item._id, 'inc')}><AiOutlinePlus /></span>
                      </p>
                    </div>
                    <button className='remove-item'>
                      <TiDeleteOutline />
                    </button>
                  </div>
                </div>
              </div>
            )) }
          </div>
          {cartItems.length >= 1 && (
            <div className="cart-bottom">
              <div className="total">
                <h3>SubTotal:</h3>
                <h3>${totalPrice}</h3>
              </div>
              <div className="btn-container">
                <button className="btn" onClick={handleCheckout}>
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
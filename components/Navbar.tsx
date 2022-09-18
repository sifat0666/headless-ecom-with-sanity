import React from 'react'
import {AiOutlineShopping} from 'react-icons/ai'
import { Cart } from '.'
import { useStateContext } from '../context/stateContext'

const Navbar = () => {
  const {showCart, setShowCart, totalQuantity } = useStateContext()
  return (
    <div className='navbar-container'>
      <p className='logo'>
        Gadget Store
      </p>
      <button className='cart-icon' onClick={()=>{setShowCart(prv => !prv)}} >
        <AiOutlineShopping />
        <span className='cart-item-qty'>{totalQuantity}</span>
      </button>

      {showCart && <Cart />}
    </div>
  )
}

export default Navbar
import React from 'react'
import {AiOutlineShopping} from 'react-icons/ai'
import { Cart } from '.'
import { useStateContext } from '../context/stateContext'

const Navbar = () => {
  const {showCart, setShowCart, totalQuantities } = useStateContext()
  return (
    <div className='navbar-container'>
      <p className='logo'>
        Gadget Store
      </p>
      <button className='cart-icon' onClick={()=>{setShowCart(prv => !prv)}} >
        <AiOutlineShopping />
        <span className='cart-item-qty'>{totalQuantities}</span>
      </button>

      {showCart && <Cart />}
    </div>
  )
}

export default Navbar
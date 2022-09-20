import Link from 'next/link';
import React, { useEffect } from 'react'
import { useStateContext } from '../context/stateContext';
import { runFireworks } from '../lib/confetti';
import {BsBagCheckFill} from 'react-icons/bs'

const Success = () => {
  const { setItems, setTotalPrice, setTotalQuantity } = useStateContext();
  
  useEffect(() => {
    localStorage.clear();
    setItems([]);
    setTotalPrice(0);
    setTotalQuantity(0);
    runFireworks();
  }, []);

  return (
    <div className="success-wrapper">
      <div className="success">
        <p className="icon">
          <BsBagCheckFill />
        </p>
        <h2>Thank you for your order!</h2>
        <p className="email-msg">Check your email inbox for the receipt.</p>
        <p className="description">
          If you have any questions, please email
          <a className="email" href="mailto:order@example.com">
            order@example.com
          </a>
        </p>
        <Link href="/">
          <button type="button" className="btn" style={{width: '300px'}}>
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Success
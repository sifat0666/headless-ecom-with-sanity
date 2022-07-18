import React, { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";


export type cartProduct = {
  _createdAt?: string,
  _id?: string,
  _rev?: string,
  _type?: string,
  _updatedAt?: string,
  details?: string,
  image?: [ { _key: string, _type: string, asset: [Object] } ],
  name?: string,
  price?: number,
  slug?: { _type: string, current: string },
  quantity?: number
}


export type ContextType = {
  qty: number,
  setQty: React.Dispatch<React.SetStateAction<number>> ,
  incQty: ()=>void
  decQty: ()=>void
  cartItems: [cartProduct]
  onAdd: (product: {}, quantity:number)=>void
  showCart: boolean,
  setShowCart: React.Dispatch<React.SetStateAction<boolean>>
  totalQuantities: number
  setTotalQuantities: React.Dispatch<React.SetStateAction<number>>
  totalPrice: number
  setTotalPrice: React.Dispatch<React.SetStateAction<number>>
  toggleCartItemQuantity: (id: any, value: any)=> void
  onRemove: (product: any)=> void
}
// const initialCart = {}


const Context = createContext<ContextType>({
    qty: 1,
    incQty: ()=> {}, 
    decQty: ()=> {}, 
    setQty:()=>{},
    cartItems: [{
        _createdAt: '0',
        _id: '0',
        _rev: 'string',
        _type: 'string',
        _updatedAt: 'string',
        details: 'string',
        image: [ { _key: 'string', _type: 'string', asset: [Object] } ],
        name: 'string',
        price: 0,
        slug: { _type: 'string', current: 'string' },
        quantity: 0
    }],
    onAdd: ()=>{},
    showCart: false,
    setShowCart: ()=>{},
    totalQuantities: 0,
    setTotalQuantities: ()=>{},
    totalPrice: 0,
    setTotalPrice: ()=>{},
    toggleCartItemQuantity: (id, value)=>{},
    onRemove: (product)=> {}

} )

export const StateContext = ({children}: any) => {
    const [showCart, setShowCart] = useState(false)
    const [cartItems, setCartItems] = useState<[cartProduct]>([{}])
    const [totalPrice, setTotalPrice] = useState(0)
    const [totalQuantities, setTotalQuantities] = useState(0)
    const [qty, setQty] = useState(1)
    let foundProduct: any
    let index

    const incQty = () => setQty(prv => prv+1)

    const decQty = () => {
        setQty( prv => {
            if(prv-1 < 1) return 1

            return prv-1
        })
    }


    const onAdd = (product: any, quantity: number)=> {
        const checkProductInCart = cartItems.find((item) => item._id === product._id);
        
        if(checkProductInCart){
            setTotalPrice(prv => prv + product.price * quantity)
            setTotalQuantities(prv => prv + quantity)

            const updatedCartItems = cartItems.map(cartProduct => {
                if(cartProduct._id === product._id){
                    return({
                        ...cartProduct,
                        quantity: cartProduct.quantity? + quantity
                    })
                }
            })
            setCartItems(updatedCartItems?)
          
        }else{
            product.quantity = quantity

            setCartItems([...cartItems, {...product}]?)
        }

        toast.success(`${qty} ${product.name} add to the cart`)


    } 

    const toggleCartItemQuantity = (id: string, value: string) => {
        foundProduct = cartItems.find((item) => item._id === id)
        index = cartItems.findIndex((product) => product._id === id);
        const newCartItems = cartItems.filter((item) => item._id !== id)

        if(value === 'inc') {
        setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity + 1 } ]?);
        setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price)
        setTotalQuantities(prevTotalQuantities => prevTotalQuantities + 1)
        } else if(value === 'dec') {
        if (foundProduct.quantity > 1) {
            setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity - 1 } ]?);
            setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price)
            setTotalQuantities(prevTotalQuantities => prevTotalQuantities - 1)
        }
        }
    }

    const onRemove = (product: any) => {
        foundProduct = cartItems.find((item) => item._id === product._id);
        const newCartItems = cartItems.filter((item) => item._id !== product._id);

        setTotalPrice((prevTotalPrice) => prevTotalPrice -foundProduct.price * foundProduct.quantity);
        setTotalQuantities(prevTotalQuantities => prevTotalQuantities - foundProduct.quantity);
        setCartItems(newCartItems?);
    }



    return(
       <Context.Provider value={{
        // showCart,
        cartItems,
        totalPrice,
        setTotalPrice,
        qty,
        incQty,
        decQty,
        setQty,
        onAdd,
        showCart,
        setShowCart,
        totalQuantities,
        setTotalQuantities,
        toggleCartItemQuantity,
        onRemove
         }}>
            {children}
       </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context)


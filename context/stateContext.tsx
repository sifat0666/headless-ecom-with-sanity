import React, { createContext, useContext, useState, ReactNode } from "react";
import toast from "react-hot-toast";



export type IProduct = {
  _createdAt?: string,
  _id?: string,
  _rev?: string,
  _type?: string,
  _updatedAt?: string,
  details?: string,
  image?: [ { _key: string, _type: string, asset: [Object] } ],
  name?: string,
  price: number,
  slug?: { _type: string, current: string },
  quantity?: number
}

export interface CartItem extends IProduct{
    quantity?: number
}




type ShoppingCartContext = {
    showCart: boolean,
    setShowCart: React.Dispatch<React.SetStateAction<boolean>>
    items?: CartItem[]
    onAdd: (product: IProduct, quantity: number) => void
    totalQuantity: number,
    toggleQuantity: (product: IProduct, quantity: number) => void
    onRemove: (product: IProduct) => void
    totalPrice: number
    setItems: React.Dispatch<React.SetStateAction<CartItem[]>>
    setTotalPrice: React.Dispatch<React.SetStateAction<number>>
    setTotalQuantity: React.Dispatch<React.SetStateAction<number>>
  }
  
  const Context = createContext({} as ShoppingCartContext)
  
  export function StateContext  ({children} :{children: ReactNode}) {
  
      const [items, setItems] = useState<CartItem[]>([])
      const [totalQuantity, setTotalQuantity] = useState<number>(0)
      const [showCart, setShowCart] = useState<boolean>(false)
      const [totalPrice, setTotalPrice] = useState<number>(0)
    //   console.log("🚀 ~ file: stateContext.tsx ~ line 47 ~ StateContext ~ totalPrice", totalPrice)

  
      const onAdd = (product: IProduct, q: number) => {
  
          if(items.length === 0) {
              setItems([...items, {...product, quantity: q}])
              toast.success(`${product.name} added to cart successfully`)
              setTotalQuantity(prv => prv+q)
          }
  
          if(items.length > 0) {
              const findProduct = items.find(item => item._id === product._id)
  
  
              if (findProduct){
                  const updatedProduct = items.map(item => {
                      if(item._id === findProduct._id){
                          setTotalQuantity(prv => prv + q)
                          setTotalPrice(prv => prv + item.price)
                          toast.success(`${item.name} added to cart successfully`)
                          return {...item, quantity: item.quantity! + q }
                      }
                      return item
                  })
                  setItems(updatedProduct)
                  // console.log('found')
              }else{
                  setTotalQuantity(prv => prv + q)
                  setTotalPrice(prv => prv + product.price)
                  toast.success(`${product.name} added to cart successfully`)
                  setItems([...items, {...product, quantity: q}])
              }
          }     
      } 
  
    //   setTotalPrice()
  
      const toggleQuantity = (data: IProduct, q: number) => {
         const findProduct = items.find(item => item._id === data._id)
         
         
         if (findProduct){
              if (findProduct.quantity === 0 && q === -1){
                  return 
              }
              const updatedProduct = items.map(item => {
                  if(item._id === findProduct._id){
                      setTotalQuantity(prv => prv + q)
                      setTotalPrice(prv => prv + item.price)
                      // toast.success(`Added ${q} ${item.title} to cart`)
                      return {...item, quantity: item.quantity! + q }
                  }
                  return item
              })
              setItems(updatedProduct)
          }
      }
      const onRemove = (product: IProduct) => {
          const foundProduct = items.find(item => item._id === product._id)
          setTotalQuantity(prv => prv - foundProduct!.quantity!)
          setTotalPrice(prv => prv - foundProduct!.price)
          const newCartItems = items.filter((item) => item._id !== product._id)
          setItems(newCartItems);

      }



    //   console.log()

    
      
  
  
  
  
      return(
          <>
          <Context.Provider value={{
              onAdd,
              items,
              totalQuantity,
              toggleQuantity,
              onRemove,
              showCart,
              setShowCart,
              totalPrice,
              setItems,
              setTotalPrice,
              setTotalQuantity,
          }}>
              {children}
          </Context.Provider>
          </>
      )
  }





export function useStateContext (){
    return useContext(Context)
}  



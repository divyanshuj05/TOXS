import React, { createContext, useRef, useState } from 'react';

export const CartContext = createContext()

export const CartContextProvider = ({ children }) => {
    
    let [items,setItems]=useState(0)
    let [price,setPrice]=useState(Number(0))
    const [order, setOrder] = useState([])
    const tempOrder=useRef([])

    const calculateDetails = (action, foodItem) => {
        setItems(items+action)
        if(action===-1)
        {
            setPrice(price-Number(foodItem.price))
            for(let i=0;i<order.length;i++)
            {
                if(foodItem.title==order[i].title)
                {
                    if(order[i].count==1)
                    {
                        order.splice(i,1)
                    }
                    else{
                        order[i].count-=1
                    }
                    setOrder(order)
                    break
                }
            }
        }
        else{
            setPrice(price+Number(foodItem.price))
            let flag=0
            for(let i=0;i<order.length;i++)
            {
                if(foodItem.title==order[i].title)
                {
                    order[i].count+=1
                    setOrder(order)
                    flag=1
                    break
                }
            }
            if(flag===0)
            {
                const data={
                    title:foodItem.title,
                    price:Number(foodItem.price),
                    count:Number(1),
                    type:foodItem.type
                }
                setOrder([...order,data])
            }
        }
    }

    const removeItems = () => {
        tempOrder.current=[]
        for(let i=0;i<order.length;i++)
        {
            if(order[i].type=="Non Veg")
            {
                price-=(order[i].price*order[i].count)
                items-=order[i].count
                setPrice(price)
                setItems(items)
            }
            else{
                tempOrder.current.push(order[i])
            }
        }
        setOrder(tempOrder.current)
    }

    const destroy = () => {
        return new Promise((resolve,reject)=>{
            setItems(items-items)
            setPrice(price-price)
            setOrder([])
            tempOrder.current=[]
            resolve("Done")
        })
    }
    
    return (
        <CartContext.Provider value={{ items, cost: price, cal: calculateDetails, destroy, order, removeItems }}>
            {children}
        </CartContext.Provider>
    )
}
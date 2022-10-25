import React, { createContext, useState } from 'react';

export const CartContext = createContext()

export const CartContextProvider = ({ children }) => {

    const [items, setItems] = useState(0)
    const [price, setPrice] = useState(Number(0))
    const [order, setOrder] = useState([])
    const [unique, setUnique] = useState([])
    const [costItem, setCostItem] = useState([])

    const calculateDetails = (rate, item, title) => {
        let flag = 0;
        setItems(items + item)
        setPrice(price + rate)
        if (item == -1) {
            let temp = order.indexOf(title)
            order.splice(temp, 1)
        }
        else {
            setOrder([...order, title])
        }
        if (unique.length === 0) {
            flag = 1;
        }
        else {
            for (var i = 0; i < unique.length; i++) {
                if (unique[i] == title) { flag = 0; break }
                else { flag = 1 }
            }
        }
        if (flag == 1) {
            setUnique([...unique, title])
            setCostItem([...costItem, rate])
        }
        flag = 0;
    }

    const destroy = () => {
        setItems(items - items)
        setPrice(price - price)
        setOrder([])
        setUnique([])
        setCostItem([])
    }

    return (
        <CartContext.Provider value={{ items, cost: price, cal: calculateDetails, destroy, order, unique, costItem }}>
            {children}
        </CartContext.Provider>
    )
}
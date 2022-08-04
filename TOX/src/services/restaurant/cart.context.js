import React, { createContext, useState } from 'react';

export const CartContext = createContext()

export const CartContextProvider = ({ children }) => {

    const [items, setItems] = useState(0)
    const [price, setPrice] = useState(0)

    const calculateDetails = (rate, item) => {
        setItems(items + item)
        setPrice(price + rate)
    }

    const destroy = () => {
        setItems(items - items)
        setPrice(price - price)
    }

    return (
        <CartContext.Provider value={{ items, cost: price, cal: calculateDetails, destroy }}>
            {children}
        </CartContext.Provider>
    )
}
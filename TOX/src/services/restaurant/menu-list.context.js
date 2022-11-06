import React, { createContext, useState, useRef } from "react"
import { MenuListServices } from "./menu-list.services";

export const MenuListContext = createContext();

export const MenuListContextProvider = ({ children }) => {

    const [restaurantMenuList, setRestaurantMenuList] = useState([])
    const vendorName=useRef(null)
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)

    const Search = (Name) => {
        setIsLoading(true)
        setRestaurantMenuList([])
        vendorName.current=null
        MenuListServices(Name).then((result) => {
            setRestaurantMenuList(result[0].menuList)
            vendorName.current=result[0].vendor
            setIsLoading(false)
        }).catch(err => {
            setIsError(err)
            setIsLoading(false)
        })
    }

    return (
        <MenuListContext.Provider value={{ restaurantMenuList, isLoading, isError, Search, vendor:vendorName.current }}>
            {children}
        </MenuListContext.Provider>
    )
}
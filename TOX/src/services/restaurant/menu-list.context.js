import React, { createContext, useState } from "react"
import { MenuListServices } from "./menu-list.services";

export const MenuListContext = createContext();

export const MenuListContextProvider = ({ children }) => {

    const [restaurantMenuList, setRestaurantMenuList] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)

    const Search = (Name) => {
        setIsLoading(true)
        setRestaurantMenuList([])
        setTimeout(() => {
            MenuListServices(Name).then((result) => {
                setRestaurantMenuList(result[0].menuList)
                setIsLoading(false)
            }).catch(err => {
                setIsError(err)
                setIsLoading(false)
            })
        }, 2000)
    }

    return (
        <MenuListContext.Provider value={{ restaurantMenuList, isLoading, isError, Search }}>
            {children}
        </MenuListContext.Provider>
    )
}
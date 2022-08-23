import React, { useState, useEffect, createContext } from "react";
import { restaurantsRequest } from "./resturant-block.services";

export const RestaurantContext = createContext();

export const RestaurantContextProvider = ({ children }) => {
    const [restaurants, setRestaurants] = useState([])
    const [restaurantCopy, setRestaurantCopy] = useState([])
    const [isCopyLoading, setIsCopyLoading] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)

    const retrieveRestaurants = (Name, flag = 0) => {
        setIsLoading(true)
        setRestaurants([])
        setTimeout(() => {
            restaurantsRequest(Name).then((result) => {
                setIsLoading(false)
                setRestaurants(result)
                if (flag == 1) {
                    setRestaurantCopy(result)
                    setIsCopyLoading(false)
                }
            }).catch(err => {
                setIsError(err)
                setIsLoading(false)
            })
        }, 2000)
    }

    useEffect(() => {
        retrieveRestaurants("Select All", 1);
    }, [])

    return (
        <RestaurantContext.Provider value={{ restaurants, restaurantCopy, isLoading, isCopyLoading, isError, Search: retrieveRestaurants }}>
            {children}
        </RestaurantContext.Provider>
    );
} 
import React, { useState, useEffect, createContext } from "react";
import { restaurantsRequest, RestaurantsCopy } from "./resturant-block.services";

export const RestaurantContext = createContext();

export const RestaurantContextProvider = ({ children }) => {
    const [restaurants, setRestaurants] = useState([])
    const [restaurantCopy, setRestaurantCopy] = useState([])
    const [isCopyLoading, setIsCopyLoading] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)

    const retrieveRestaurants = (Name) => {
        setIsLoading(true)
        setRestaurants([])
        setTimeout(() => {
            restaurantsRequest(Name).then((result) => {
                setIsLoading(false)
                setRestaurants(result)
            }).catch(err => {
                setIsError(err)
                setIsLoading(false)
            })
        }, 2000)
    }



    useEffect(() => {
        retrieveRestaurants("Select All");
    }, [])

    useEffect(() => {
        setTimeout(() => {
            RestaurantsCopy().then((res) => {
                setRestaurantCopy(res)
                setIsCopyLoading(false)
            })
        }, 1000)
    }, [])

    return (
        <RestaurantContext.Provider value={{ restaurants, restaurantCopy, isLoading, isCopyLoading, isError, Search: retrieveRestaurants }}>
            {children}
        </RestaurantContext.Provider>
    );
} 
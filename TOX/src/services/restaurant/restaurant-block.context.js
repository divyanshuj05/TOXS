import React, { useState, useEffect, createContext } from "react";
import { restaurantsRequest } from "./resturant-block.services";

export const RestaurantContext = createContext();

export const RestaurantContextProvider = ({ children }) => {
    const [restaurants, setRestaurants] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [keyword, setKeyword] = useState("Dessert Club")

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
        retrieveRestaurants("All");
    }, [])

    return (
        <RestaurantContext.Provider value={{ restaurants, isLoading, isError, Search: retrieveRestaurants }}>
            {children}
        </RestaurantContext.Provider>
    );
} 
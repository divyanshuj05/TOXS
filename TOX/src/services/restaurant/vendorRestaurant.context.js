import React,{ createContext, useState, useEffect, useContext } from 'react'
import { VendorRestaurantsRequest } from './vendorRestaurant.services'
import { AuthenticationContext } from "../authentication/authentication.context"

export const VendorRestaurantContext=createContext()

export const VendorRestaurantContextProvider = ({ children }) => {
    const [restaurant,setRestaurant]=useState([])
    const [isLoading,setIsLoading]=useState(false)
    const [isError,setIsError]=useState(false)

    const { user } =useContext(AuthenticationContext)

    const Search = (name) =>{
        setIsLoading(true)
        setRestaurant([])
        setTimeout(()=>{
            VendorRestaurantsRequest(name).then((res)=>{
                setRestaurant(res)
                setIsLoading(false)

            }).catch(err=>{
                setIsError(err)
                setIsLoading(false)
            })
        },2000)
    }

    useEffect(()=>{
        Search(user.userName)
    },[])

    return(
        <VendorRestaurantContext.Provider value={{restaurant,isLoading,isError}}>
            {children}
        </VendorRestaurantContext.Provider>
    )
}
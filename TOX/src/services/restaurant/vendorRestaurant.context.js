import React,{ createContext, useState, useEffect, useContext,useRef } from 'react'
import { VendorRestaurantsRequest,AddFoodItem,EditFoodItem,DeleteFoodItem } from './vendorRestaurant.services'
import { AuthenticationContext } from "../authentication/authentication.context"

export const VendorRestaurantContext=createContext()

export const VendorRestaurantContextProvider = ({ children }) => {
    const restaurant =useRef([])
    const [isLoading,setIsLoading]=useState(false)
    const [isError,setIsError]=useState(null)

    const { user } =useContext(AuthenticationContext)

    const Search = (name) =>{
        setIsLoading(true)
        setTimeout(()=>{
            VendorRestaurantsRequest(name).then((res)=>{
                restaurant.current=res
                setIsLoading(false)
            }).catch(err=>{
                setIsError(err)
                setIsLoading(false)
            })
        },1000)
    }

    useEffect(()=>{
        Search(user.userName)
    },[])

    const addItem = (title,cost,Restaurant) => {
        setIsLoading(true)
        if(title==""||cost=="")
        {
            setIsLoading(false)
            return "Fill information first!"
        }
        for(let i=0;i<cost.length;i++)
        {
            if(isNaN(cost[i])==true) 
            {   setIsLoading(false) 
                return "Only numbers are allowed"   
            }
        }
        if(cost<=0)
        {
            setIsLoading(false)
            return "Negative numbers and spaces are not allowed"
        }
        setTimeout(()=>{
            AddFoodItem(title,cost,Restaurant).then(res=>{
                Search(user.userName)
                return null
            }).catch(err=>{
                console.log(err)
                setIsLoading(false)
                return "Operation failed!! Please try again"
            })
        },1000)
    }

    const editItem = (title,oldCost,newCost,Restaurant) => { 
        setIsLoading(true)
        if(newCost=="") 
        {
            setIsLoading(false)
            return "Add cost first!"
        }
        for(let i=0;i<newCost.length;i++)
        {
            if(isNaN(newCost[i])==true) 
            {   setIsLoading(false) 
                return "Only numbers are allowed"   
            }
        }
        if(newCost<=0) {
            setIsLoading(false)
            return "Negative numbers and spaces are not allowed"}
        if(newCost==oldCost) {
            setIsLoading(false)
            return null}
        setTimeout(()=>{
            EditFoodItem(title,oldCost,newCost,Restaurant).then(res=>{
                Search(user.userName)
                return null
            }).catch(err=>{
                console.log(err)
                setIsLoading(false)
                return err
            })
        },1000)
        
    }

    const deleteItem = (title,cost,Restaurant) => {
        setIsLoading(true)
        setTimeout(()=>{
            DeleteFoodItem(title,cost,Restaurant).then(res=>{
                Search(user.userName)
                return null
            }).catch(err=>{
                console.log(err)
                setIsLoading(false)
                return "Operation failed!!"
            })
        },1000)

    }

    return(
        <VendorRestaurantContext.Provider value={{
            restaurant: restaurant.current,
            isLoading,
            isError,
            addItem,
            editItem,
            deleteItem
        }}>
            {children}
        </VendorRestaurantContext.Provider>
    )
}
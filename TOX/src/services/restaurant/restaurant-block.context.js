import React, { useState, useEffect, createContext, useRef } from "react";
import { restaurantsRequest, Orders, SendVendorNoti } from "./resturant-block.services";
import { Alert } from "react-native";
import { SendNotification } from "../common/notisFunctions.services";

export const RestaurantContext = createContext();

export const RestaurantContextProvider = ({ children }) => {
    const restaurants=useRef([])
    const [refresh,setRefresh]=useState(false)
    const [restaurantCopy, setRestaurantCopy] = useState([])
    const [isCopyLoading, setIsCopyLoading] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)

    const retrieveRestaurants = (flag = 0) => {
        setIsLoading(true)
        restaurants.current=[]
        restaurantsRequest().then((result) => {
            setIsLoading(false)
            restaurants.current=result
            setRefresh(!refresh)
            setRestaurantCopy(result)
            setIsCopyLoading(false)
        }).catch(err => {
            setIsError(err)
            setIsLoading(false)
        })
    }

    const sortByAddress = (value) => {
        setIsLoading(true)
        restaurants.current=[]
        if(value=="Select All")
        {
            restaurants.current=restaurantCopy
        }
        else{
            restaurantCopy.forEach((ele)=>{
                if(ele.address==value)
                {
                    restaurants.current=[...restaurants.current,ele]
                }
            })
        }
        setRefresh(!refresh)
        setIsLoading(false)
    }

    const SendOrder= (email,amount,vendor,data,restaurant) => {
        return new Promise(async(resolve,reject)=>{
            setIsLoading(true)
            Orders(email,amount,vendor,data,restaurant).then(res=>{
                SendVendorNoti(vendor).then(res=>{
                    if(res!="null")
                    {
                        SendNotification(res,"New order","Check order list for new order")
                    }
                    setIsLoading(false)
                    Alert.alert(
                        "Order sent successfully",
                        "Your order will be ready by some time",
                        [
                            {
                                text: "Ok",
                                onPress: () => { resolve("Done") }
                            }
                        ]
                    )
                })
            }).catch(e=>{
                setIsLoading(false)
                alert(e)
                reject("Failed")
                return
            })
        })
    }

    return (
        <RestaurantContext.Provider value={{ 
            restaurants:restaurants.current,
            restaurantCopy, 
            isLoading, 
            isCopyLoading, 
            isError, 
            Search: retrieveRestaurants,
            SendOrder,
            sortByAddress,
            refresh
        }}>
            {children}
        </RestaurantContext.Provider>
    );
} 
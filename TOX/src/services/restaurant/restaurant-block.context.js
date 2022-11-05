import React, { useState, useEffect, createContext } from "react";
import { restaurantsRequest, Orders, SendVendorNoti } from "./resturant-block.services";
import { Alert } from "react-native";
import { SendNotification } from "../common/notisFunctions.services";

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

    const SendOrder= (email,amount,vendor,data,restaurant,navigation) => {
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
                            onPress: () => { navigation.navigate("RestaurantsHome") }
                        }
                    ]
                )
            })
            
        }).catch(e=>{
            setIsLoading(false)
            alert(e)
            return
        })
    }

    useEffect(() => {
        retrieveRestaurants("Select All", 1);
    }, [])

    return (
        <RestaurantContext.Provider value={{ 
            restaurants, 
            restaurantCopy, 
            isLoading, 
            isCopyLoading, 
            isError, 
            Search: retrieveRestaurants,
            SendOrder 
        }}>
            {children}
        </RestaurantContext.Provider>
    );
} 
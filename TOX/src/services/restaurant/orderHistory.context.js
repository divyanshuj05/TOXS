import React,{ createContext,useState } from 'react'
import { GetOrders, OrderReadyStatus, GetNotiToken } from './orderHistory.services'
import { SendNotification } from '../common/notisFunctions.services'
import { Alert } from 'react-native'

export const RestaurantHistoryContext = createContext()

export const RestaurantHistoryContextProvider = ({children}) => {

    const [history,setHistory]=useState([])
    const [isLoading,setIsLoading]=useState(false)

    const Search = (name,coll) => {
        setIsLoading(true)
        setHistory([])
        GetOrders(name,coll).then(res=>{
            setHistory(res)
            setIsLoading(false)
        }).catch(e=>{
            console.log(e)
            setIsLoading(false)
        })
    }

    const OrderReady = (id,mail,navigation) => {
        setIsLoading(true)
        OrderReadyStatus(id).then(res=>{
            GetNotiToken(mail).then(res=>{
                if(res!="null")
                {
                    SendNotification(res,"Food Order","YOur food order is ready to take")
                }
                setIsLoading(false)
                Alert.alert(
                    "Done",
                    "Changes were successfully made",
                    [
                        {
                            text:"Ok",
                            onPress:()=>{navigation.navigate("RestaurantsHome")}
                        }
                    ]
                )
            }).catch(e=>{
                setIsLoading(false)
                alert("Something went wrong. Please try again")
                return
            })
        }).catch(e=>{
            setIsLoading(false)
            alert("Something went wrong. Please try again")
            return
        })
    }

    return(
        <RestaurantHistoryContext.Provider value={{
            history,
            isLoading,
            Search,
            OrderReady
        }}>
            {children}
        </RestaurantHistoryContext.Provider>
    )
}
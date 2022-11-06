import React,{ createContext,useState } from 'react'
import { GetOrders, OrderReadyStatus, GetNotiToken, SearchStatus } from './orderHistory.services'
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

    const OrderReady = (id,mail,navigation,type,status) => {
        setIsLoading(true)
        OrderReadyStatus(id,status).then(res=>{
            if(type=="users")
            { 
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
                return
            }
            GetNotiToken(mail).then(res=>{
                if(res!="null")
                {
                    SendNotification(res,"Food Order","Your food order is ready to take")
                }
                setIsLoading(false)
                Alert.alert(
                    "Done",
                    "Changes were successfully made",
                    [
                        {
                            text:"Ok",
                            onPress:()=>{navigation.goBack()}
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

    const SearchByStatus = (status,type,name) => {
        setIsLoading(true)
        setHistory([])
        if(status=="Select All")
        {
            GetOrders(name,type).then(res=>{
                setHistory(res)
                setIsLoading(false)
            }).catch(e=>{
                alert("Some error occured")
                console.log(e)
                setIsLoading(false)
            })
            return
        }
        SearchStatus(name,type,status).then(res=>{
            setHistory(res)
            setIsLoading(false)
        }).catch(e=>{
            alert("Some error occured")
            console.log(e)
            setIsLoading(false)
        })
    }

    return(
        <RestaurantHistoryContext.Provider value={{
            history,
            isLoading,
            Search,
            OrderReady,
            SearchByStatus
        }}>
            {children}
        </RestaurantHistoryContext.Provider>
    )
}
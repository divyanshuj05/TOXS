import React,{ createContext,useState,useRef } from 'react'
import { GetOrders, OrderReadyStatus, GetNotiToken, GetMobileData } from './orderHistory.services'
import { SendNotification } from '../common/notisFunctions.services'
import { Alert } from 'react-native'

export const RestaurantHistoryContext = createContext()

export const RestaurantHistoryContextProvider = ({children}) => {

    const history=useRef([])
    const [refresh,setRefresh]=useState(false)
    const [historyCopy,setHistoryCopy]=useState([])
    const [isLoading,setIsLoading]=useState(false)
    const [mobile,setMobile]=useState(null)

    const sort = (res) => {
        function compare(a,b){
            if(a.orderDate&&b.orderDate)
            {
                const x=new Date(a.orderDate)
                const y=new Date(b.orderDate)
                if(x>y) return -1
                else if(x<y) return 1
                else if(+x===+y){
                    if(a.orderTime>b.orderTime) return -1
                    else if(a.orderTime<b.orderTime) return 1
                    else return 0
                }
            }
        }
        res.sort(compare)
        history.current=res
    }

    const Search = (name,coll,flag=0) => {
        setIsLoading(true)
        history.current=[]
        GetOrders(name,coll).then(res=>{
            sort(res)
            setHistoryCopy(history.current)
            setRefresh(!refresh)
            setIsLoading(false)
        }).catch(e=>{
            console.log(e)
            setIsLoading(false)
        })
    }

    const OrderReady = (id,mail,navigation,type,status,name) => {
        setIsLoading(true)
        OrderReadyStatus(id,status).then(res=>{
            GetNotiToken(mail).then(res=>{
                if(res!="null")
                {
                    if(status=="Delivered")
                    {
                        SendNotification(res,"Food Order","Your food order has been delivered")
                    }
                    else{
                        SendNotification(res,"Food Order","Your food order is ready to take")
                    }
                }
                Search(name,type)
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

    const SearchByStatus = (status) => {
        setIsLoading(true)
        history.current=[]
        if(status==="Select All")
        {
            history.current=historyCopy
        }
        else{
            historyCopy.forEach((ele)=>{
                if(ele.status==status)
                {
                    history.current=[...history.current,ele]
                }
            })
        }
        sort(history.current)
        setRefresh(!refresh)
        setIsLoading(false)
    }

    const GetCustomerData = (mail) => {
        setIsLoading(true)
        setMobile(null)
        GetMobileData(mail).then(res=>{
            if(res.mobileDisplay==="No"){
                setMobile("Null")
            }
            else{
                setMobile(res.mobileNo)
            }
            setIsLoading(false)
            return
        }).catch(err=>{
            setIsLoading(false)
            return null
        })
    }

    return(
        <RestaurantHistoryContext.Provider value={{
            history:history.current,
            isLoading,
            SearchHistory:Search,
            OrderReady,
            SearchByStatus,
            refresh,
            GetCustomerData,
            mobile
        }}>
            {children}
        </RestaurantHistoryContext.Provider>
    )
}
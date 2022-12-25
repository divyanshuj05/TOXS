import React, { createContext,useContext,useState,useRef } from 'react'
import { AuthenticationContext } from "../authentication/authentication.context"
import { StoreImage, AddItem, RetrieveData, UpdateData, GetMobileData } from './exchange.service'
import { Alert } from 'react-native'

export const ExchangeContext = createContext()

export const ExchangeContextProvider = ({ children }) => {

    const { user } =useContext(AuthenticationContext)
    const exchange =useRef([])
    const [refresh,setRefresh]=useState(false)
    const [exchangeCopy,setExchangeCopy]=useState([])
    const [isLoading,setIsLoading]=useState(false)
    const buyersData=useRef([])

    const Search = () => {
        setIsLoading(true)
        exchange.current=[]
        RetrieveData().then(res=>{
            exchange.current=res
            setExchangeCopy(res)
            setRefresh(!refresh)
            setIsLoading(false)
        }).catch(err=>{
            console.log(err)
            setIsLoading(false)
        })
    }

    const SortByStatus = (value) => {
        exchange.current=[]
        setIsLoading(true)
        if(value==="Select All")
        {
            exchange.current=exchangeCopy
        }
        else{
            exchangeCopy.forEach((ele)=>{
                if(ele.category==value)
                {
                    exchange.current=[...exchange.current,ele]
                }
            })
        }
        setRefresh(!refresh)
        setIsLoading(false)
    }   

    const Sort = (index) => {
        setIsLoading(true)
        if(index==="None")
        {
            let tempArr=exchange.current
            function compare(a,b){
                return Math.floor(Math.random()*3)-1
              }
            tempArr.sort(compare);
            exchange.current=tempArr
        }
        else{
            let tempArr=exchange.current
            function compare(a,b){
                if(Number(a.cost)<Number(b.cost)){
                  return -1;
                }
                if(a.cost>b.cost){
                  return 1;
                }
                return 0;
              }
            tempArr.sort(compare);
            if(index=="Descending") tempArr.reverse()
            exchange.current=tempArr
        }
        setRefresh(!refresh)
        setIsLoading(false)
    }

    const addItem = (item,desc,price,category,image,setError) => {
        return new Promise((resolve,reject)=>{
            setIsLoading(true)
            if(item=="")
            {
                setIsLoading(false)
                setError("Fill name of item")
                reject("Fail")
                return
            }
            if(desc=="")
            {
                setIsLoading(false)
                setError("Fill description of item")
                reject("Fail")
                return
            }
            if(desc.length>200)
            {
                desc=desc.substring(0,199)
            }
            if(category==""||category==undefined||category==null)
            {
                setIsLoading(false)
                setError("Fill category of item")
                reject("Fail")
                return
            }
            if(price==""||price==undefined)
            {
                setIsLoading(false)
                setError("Fill price of item")
                reject("Fail")
                return
            }
            if(price<=0)
            {
                setIsLoading(false)
                setError("Neagtive number is not allowed")
                reject("Fail")
                return
            }
            for(let i=0;i<price.length;i++) 
            {
                if(isNaN(price[i]))
                {
                    setIsLoading(false)
                    setError("Price contains a non number")
                    reject("Fail")
                    return
                }
            }
            if(image==null)
            {
                setIsLoading(false)
                setError("Image not added")
                reject("Fail")
                return
            }
            StoreImage(image).then(res=>{
                    AddItem(item,desc,price,category,res.url,res.imgName,user.email).then(res=>{
                        setIsLoading(false)
                        Alert.alert(
                        "Item added Successfully",
                        "Item will be displayed to other users",
                        [
                            {
                                text: "Ok",
                                onPress: () => { resolve("Done") }
                            }
                        ]
                        )
                    }).catch(err=>{
                        setError(err)
                        setIsLoading(false)
                        reject("Fail")
                        return
                    })
                })
                .catch(err=>{
                    setError(err)
                    setIsLoading(false)
                    reject("Fail")
                    return
                })
        })
    }

    const UpdateExchanges = (obj,status,soldTo=null,setError) => {
        return new Promise(async(resolve,reject)=>{
            setIsLoading(true)
            UpdateData(obj,status,soldTo,user.email).then(res=>{
                Alert.alert(
                    "Done",
                    "Changes were successfully made",
                    [
                        {
                            text: "Ok",
                            onPress: () => {resolve("Done"),setIsLoading(false) }
                        }
                    ]
                )
            }).catch(err=>{ 
                setError(err)
                setIsLoading(false)
                reject(err)
            })
        })
    }

    const RetrieveBuyersDetails = (buyers) => {
        for(let i=0;i<buyers.length;i++)
        {
            const data={
                "mail":buyers[i],
                "mobile":null
            }
            buyersData.current.push(data)
        }
        for(let i=0;i<buyers.length;i++) 
        {
            GetMobileData(buyers[i]).then(res=>{
                if(res.mobileNo!=undefined||res.mobileNo!=null) 
                {
                    if(res.mobileDisplay==="No"){
                        const ind=buyersData.current.findIndex(ele=>ele.mail==buyers[i])
                        buyersData.current[ind].mobile="No" 
                    }
                    else{
                        const ind=buyersData.current.findIndex(ele=>ele.mail==buyers[i])
                        buyersData.current[ind].mobile=res.mobileNo
                    }
                }
            })
        }
    }

    const Destroy = () => {
        buyersData.current=[]
    }

    return(
        <ExchangeContext.Provider value={{
            addItem,
            isLoading,
            exchange:exchange.current,
            Search, 
            Sort,
            UpdateExchanges,
            SortByStatus,
            refresh,
            RetrieveBuyersDetails,
            buyersData:buyersData.current,
            Destroy
        }}>
            {children}
        </ExchangeContext.Provider>
    )
} 
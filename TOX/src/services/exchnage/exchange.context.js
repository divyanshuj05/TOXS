import React, { createContext,useContext,useState,useRef } from 'react'
import { AuthenticationContext } from "../authentication/authentication.context"
import { StoreImage, AddItem, RetrieveData, UpdateData } from './exchange.service'
import { Alert } from 'react-native'

export const ExchangeContext = createContext()

export const ExchangeContextProvider = ({ children }) => {

    const { user } =useContext(AuthenticationContext)

    const exchange =useRef([])
    const [isLoading,setIsLoading]=useState(false)

    const Search = (category) => {
        setIsLoading(true)
        exchange.current=[]
        setTimeout(()=>{
            RetrieveData(category).then(res=>{
                exchange.current=res
                setIsLoading(false)
            }).catch(err=>{
                console.log(err)
                setIsLoading(false)
            })
        },1500)
    }

    const Sort = (index) => {
        setIsLoading(true)
        let tempArr=exchange.current
        function compare(a,b){
            if(a.cost<b.cost){
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
        setIsLoading(false)

    }

    const addItem = (item,desc,price,category,image,navigation) => {
        setIsLoading(true)
        if(item=="")
        {
            setIsLoading(false)
            return "Fill name of item"
        }
        if(desc=="")
        {
            setIsLoading(false)
            return "Fill description of item"
        }
        if(desc.length>200)
        {
            desc=desc.substring(0,199)
        }
        if(category==""||category==undefined||category==null)
        {
            setIsLoading(false)
            return "Fill category of item"
        }
        if(price==""||price==undefined)
        {
            setIsLoading(false)
            return "Fill price of item"
        }
        if(price<=0)
        {
            setIsLoading(false)
            return "Neagtive number is not allowed"
        }
        for(let i=0;i<price.length;i++) 
        {
            if(isNaN(price[i]))
            {
                setIsLoading(false)
                return "Price contains a non number"
            }
        }
        if(image==null)
        {
            setIsLoading(false)
            return "Image not added"
        }
        setTimeout(()=>{
            StoreImage(image).then(res=>{
                    AddItem(item,desc,price,category,res.url,res.imgName,user.email).then(res=>{
                        setIsLoading(false)
                        Alert.alert(
                        "Item added Successfully",
                        "Item will be displayed to other users",
                        [
        
                            {
                                text: "Ok",
                                onPress: () => { navigation.goBack() }
                            }
                        ]
                        )
                        return null
                    }).catch(err=>{
                        setIsLoading(false)
                        return err
                    })
                })
                .catch(err=>{
                    setIsLoading(false)
                    return err
                })
        },500)
    }

    const UpdateExchanges = (obj,status,navigation) => {
        setIsLoading(true)
        setTimeout(()=>{
            UpdateData(obj,status,user.email).then(res=>{
                Alert.alert(
                    "Done",
                    "Changes were successfully made",
                    [
    
                        {
                            text: "Ok",
                            onPress: () => { navigation.navigate("ExchangeHome") }
                        }
                    ]
                    )
                setIsLoading(false)
                return null
            }).catch(err=>{ 
                setIsLoading(false)
                return err
            })
        },500)
    }

    return(
        <ExchangeContext.Provider value={{
            addItem,
            isLoading,
            exchange:exchange.current,
            Search, 
            Sort,
            UpdateExchanges
        }}>
            {children}
        </ExchangeContext.Provider>
    )
} 
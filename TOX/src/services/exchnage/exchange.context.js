import React, { createContext,useContext,useState } from 'react'
import { AuthenticationContext } from "../authentication/authentication.context"
import { StoreImage, AddItem } from './exchange.service'
import { Alert } from 'react-native'

export const ExchangeContext = createContext()

export const ExchangeContextProvider = ({ children }) => {

    const { user } =useContext(AuthenticationContext)
    const [isLoading,setIsLoading]=useState(false)

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
        if(category=="")
        {
            setIsLoading(false)
            return "Fill category of item"
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
        if(image.uri==null)
        {
            setIsLoading(false)
            return "Image not added"
        }
        setTimeout(()=>{
            StoreImage(image).then(res=>{
                    AddItem(item,desc,price,category,res,user.email).then(res=>{
                        console.log(res)
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
        },1000)
    }

    return(
        <ExchangeContext.Provider value={{addItem,isLoading}}>
            {children}
        </ExchangeContext.Provider>
    )
} 
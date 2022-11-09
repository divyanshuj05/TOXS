import React, { createContext, useContext, useRef, useState } from 'react'
import { AuthenticationContext } from '../authentication/authentication.context'
import { RetrieveHistory, GetMobileData, RetrieveHistoryByStatus } from './exchange.service'

export const ExchangeHistoryContext = createContext()

export const ExchangeHistoryContextProvider = ({children}) => {

    const { user } = useContext(AuthenticationContext)

    const history = useRef([])
    const [detailsLoading,setDetailsLoading]=useState(false)
    const [mobile,setMobile]=useState(null)

    const UserData = () => {
        setDetailsLoading(true)
        history.current=[]
        RetrieveHistory(user.email).then(res=>{
            history.current=res
            setDetailsLoading(false)
        }).catch(err=>{
            console.log(err)
            setDetailsLoading(false)
        })
    }

    const RetrieveMobile = (email) => {
        setDetailsLoading(true)
        GetMobileData(email).then(res=>{
            setDetailsLoading(false)
            setMobile(res.mobileNo)
            return
        }).catch(err=>{
            setDetailsLoading(false)
            return null
        })
    }

    const SearchByStatus = (status,type,mail) => {
        if(status=="Select All")
        {
            UserData()
            return
        }
        else{
            setDetailsLoading(true)
            history.current=[]
            RetrieveHistoryByStatus(mail,status).then(res=>{
                history.current=res
                setDetailsLoading(false)
            }).catch(err=>{
                console.log(err)
                setDetailsLoading(false)
        })
        }
    }

    return(
        <ExchangeHistoryContext.Provider value={{
            history:history.current,
            detailsLoading,
            UserData,
            RetrieveMobile,
            mobile,
            SearchByStatus
        }}>
            {children}
        </ExchangeHistoryContext.Provider>
    )
}
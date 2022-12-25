import React, { createContext, useContext, useRef, useState } from 'react'
import { AuthenticationContext } from '../authentication/authentication.context'
import { RetrieveHistory, GetMobileData } from './exchange.service'

export const ExchangeHistoryContext = createContext()

export const ExchangeHistoryContextProvider = ({children}) => {

    const { user } = useContext(AuthenticationContext)

    const history = useRef([])
    const [historyCopy,setHistoryCopy]=useState([])
    const [refresh,setRefresh]=useState(false)
    const [detailsLoading,setDetailsLoading]=useState(false)
    const [mobile,setMobile]=useState(null)

    const sort = (res) => {
        function compare(a,b){
            if(a.postDate&&b.postDate)
            {
                const x=new Date(a.postDate)
                const y=new Date(b.postDate)
                if(x>y) return -1
                else if(x<y) return 1
                else if(+x===+y){
                    if(a.postTime>b.postTime) return -1
                    else if(a.postTime<b.postTime) return 1
                    else return 0
                }
            }
        }
        res.sort(compare)
        history.current=res
        setHistoryCopy(res)
    }

    const UserData = () => {
        setDetailsLoading(true)
        history.current=[]
        RetrieveHistory(user.email).then(res=>{
            sort(res)
            setDetailsLoading(false)
        }).catch(err=>{
            console.log(err)
            setDetailsLoading(false)
        })
    }

    const RetrieveMobile = (email) => {
        setDetailsLoading(true)
        GetMobileData(email).then(res=>{
            if(res.mobileDisplay==="No"){
                setMobile("Null")
            }
            else{
                setMobile(res.mobileNo)
            }
            setDetailsLoading(false)
            return
        }).catch(err=>{
            setDetailsLoading(false)
            return null
        })
    }

    const SearchByStatus = (status) => {
        history.current=[]
        setDetailsLoading(true)
        if(status=="Select All")
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
        setDetailsLoading(false)
        setRefresh(!refresh)
    }

    return(
        <ExchangeHistoryContext.Provider value={{
            history:history.current,
            detailsLoading,
            UserData,
            RetrieveMobile,
            mobile,
            SearchByStatus,
            refresh
        }}>
            {children}
        </ExchangeHistoryContext.Provider>
    )
}
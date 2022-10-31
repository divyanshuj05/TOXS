import React, { createContext, useEffect, useState } from 'react'
import * as ScreenOrientation from 'expo-screen-orientation';

export const DeviceOrientationContext = createContext()

export const DeviceOrientationContextProvider= ({ children }) => {

    const [orientation,setOrientation] = useState(null)
    const [isOrientationLoading,setIsOrientationLoading]=useState(false)

    useEffect(()=>{
        async function getOrientation(){
            setIsOrientationLoading(true)
            let res=await ScreenOrientation.getOrientationAsync()
            setOrientation(res)
            setIsOrientationLoading(false)
        }
        function detectOrientationChange(){
            ScreenOrientation.addOrientationChangeListener(getOrientation)
        }
        getOrientation()
        detectOrientationChange()
    },[])

    const LockOrientation = async() => {
        if(orientation==1)
        {
            await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
        }
        else if(orientation == 2) 
        {
            await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_DOWN);
        } 
        else if(orientation==3)
        {
            await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);
        }
        else{
            await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);
        }
    }

    const UnlockOrientation = async() => { 
        await ScreenOrientation.unlockAsync()
    }

    return(
        <DeviceOrientationContext.Provider value={{
            orientation,
            isOrientationLoading,
            LockOrientation,
            UnlockOrientation
        }}>
            {children}
        </DeviceOrientationContext.Provider>
    )
}
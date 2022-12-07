import React, { useState,useEffect } from "react";
import { useFonts as OswaldFont, Oswald_400Regular } from '@expo-google-fonts/oswald';
import { useFonts as LatoFont, Lato_400Regular } from '@expo-google-fonts/lato';
import { AppThemeContextProvider } from "./src/services/common/theme.context";
import { Index } from "./src/features/common/screens/index.screens";
import { AuthenticationContextProvider } from "./src/services/authentication/authentication.context";
import { DeviceOrientationContextProvider } from "./src/services/common/deviceOrientation.context";
import { DeviceOffline } from "./src/features/common/screens/offlineDevice.screens";
import NetInfo from "@react-native-community/netinfo"
import 'expo-dev-client';

export default function App() {

  const [isNetwork,setIsNetwork] = useState(false)

  useEffect(()=>{
    NetInfo.addEventListener(state=>{
        if(state.isConnected) {setIsNetwork(true)}
        else {setIsNetwork(false)}
      })
  },[])

  const [OswaldLoaded] = OswaldFont({
    Oswald_400Regular
  });
  const [LatoLoaded] = LatoFont({
    Lato_400Regular
  });
  if (!OswaldLoaded || !LatoLoaded) {
    return null;
  }

  if(!isNetwork)
  {
    return(
      <DeviceOffline />
    )
  }

  return (
    <>
      <DeviceOrientationContextProvider>
        <AuthenticationContextProvider>
          <AppThemeContextProvider>
            <Index />
          </AppThemeContextProvider>
        </AuthenticationContextProvider>
      </DeviceOrientationContextProvider>
    </>
  );
}
import React from "react";
import { useFonts as OswaldFont, Oswald_400Regular } from '@expo-google-fonts/oswald';
import { useFonts as LatoFont, Lato_400Regular } from '@expo-google-fonts/lato';
import { AppThemeContextProvider } from "./src/services/common/theme.context";
import { Index } from "./src/features/common/screens/index.screens";
import { AuthenticationContextProvider } from "./src/services/authentication/authentication.context";
import { DeviceOrientationContextProvider } from "./src/services/common/deviceOrientation.context";

export default function App() {

  const [OswaldLoaded] = OswaldFont({
    Oswald_400Regular
  });
  const [LatoLoaded] = LatoFont({
    Lato_400Regular
  });
  if (!OswaldLoaded || !LatoLoaded) {
    return null;
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
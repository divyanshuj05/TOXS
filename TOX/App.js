import React from "react";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { ThemeProvider } from "styled-components/native";
import { theme } from "./src/infrastructure/theme/index";
import { useFonts as OswaldFont, Oswald_400Regular } from '@expo-google-fonts/oswald';
import { useFonts as LatoFont, Lato_400Regular } from '@expo-google-fonts/lato';
import { Navigation } from "./src/infrastructure/navigation";
import { RestaurantContextProvider } from "./src/services/restaurant/restaurant-block.context";
import { CartContextProvider } from "./src/services/restaurant/cart.context";

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
      <ThemeProvider theme={theme}>
        <RestaurantContextProvider>
          <CartContextProvider>
            <Navigation />
          </CartContextProvider>
        </RestaurantContextProvider>
      </ThemeProvider>
      <ExpoStatusBar style="auto" />
    </>
  );
}
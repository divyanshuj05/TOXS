import React, { useContext } from 'react';
import { ThemeProvider } from "styled-components/native";
import { theme as lightTheme } from "../../../infrastructure/theme/index(light)";
import { theme as darkTheme } from "../../../infrastructure/theme/index(dark)";
import { Navigation } from "../../../infrastructure/navigation";
import { RestaurantContextProvider } from "../../../services/restaurant/restaurant-block.context";
import { CartContextProvider } from "../../../services/restaurant/cart.context";
import { AppThemeContext } from '../../../services/common/theme.context';
import { StatusBar as ExpoStatusBar } from "expo-status-bar";

export const Index = () => {

    const { scheme } = useContext(AppThemeContext);

    return (
        <ThemeProvider theme={scheme === 'dark' ? darkTheme : lightTheme}>
            <ExpoStatusBar style={scheme === "dark" ? "light" : "dark"} backgroundColor={scheme === "dark" ? "black" : "white"} />
            <RestaurantContextProvider>
                <CartContextProvider>
                    <Navigation />
                </CartContextProvider>
            </RestaurantContextProvider>
        </ThemeProvider>
    )
}
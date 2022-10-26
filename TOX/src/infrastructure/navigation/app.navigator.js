import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from '@expo/vector-icons';
import { HomeNavigator } from "./home.navigator.js";
import { AppThemeContext } from "../../services/common/theme.context.js";
import { SettingsNavigator } from "./settings.navigator";
import { FavouritesContextProvider } from "../../services/restaurant/favourites.context.js";
import { CartContextProvider } from "../../services/restaurant/cart.context.js";
import { RestaurantContextProvider } from "../../services/restaurant/restaurant-block.context.js";
import { MenuListContextProvider } from "../../services/restaurant/menu-list.context.js";
import { ProfileScreen } from "../../features/settings/screens/profile.screens.js";
import { ExchangeContextProvider } from "../../services/exchnage/exchange.context.js";

const Tab = createBottomTabNavigator();

export const AppNavigator = () => {

  const { scheme } = useContext(AppThemeContext)

  return (
    <FavouritesContextProvider>
      <RestaurantContextProvider>
        <ExchangeContextProvider>
          <MenuListContextProvider>
            <CartContextProvider>
              <Tab.Navigator
                screenOptions={({ route }) => ({
                  tabBarIcon: ({ color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                      iconName = "home-outline"
                    } else if (route.name === 'Profile') {
                      return <AntDesign name="profile" size={size} color={color} />
                    } else if (route.name === "Settings") {
                      iconName = "settings-outline"
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                  },
                  tabBarActiveTintColor: 'red',
                  tabBarInactiveTintColor: 'gray',
                  tabBarStyle: { backgroundColor: scheme === 'dark' ? "black" : "white" },
                  headerShown: false
                })}
              >
                <Tab.Screen name="Home" component={HomeNavigator} />
                <Tab.Screen name="Profile" component={ProfileScreen} />
                <Tab.Screen name="Settings" component={SettingsNavigator} />
              </Tab.Navigator>
            </CartContextProvider>
            </MenuListContextProvider>
          </ExchangeContextProvider>
      </RestaurantContextProvider>
    </FavouritesContextProvider >
  );
}
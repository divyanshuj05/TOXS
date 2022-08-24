import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { HomeNavigator } from "./home.navigator.js";
import { AppThemeContext } from "../../services/common/theme.context.js";
import { SettingsNavigator } from "./settings.navigator";
import { FavouritesContextProvider } from "../../services/restaurant/favourites.context.js";
import { CartContextProvider } from "../../services/restaurant/cart.context.js";
import { RestaurantContextProvider } from "../../services/restaurant/restaurant-block.context.js";
import { SafeArea } from "../../utils/components/safe-area.components.js";
import { ProfileScreen } from "../../features/settings/screens/profile.screens.js";

const Tab = createBottomTabNavigator();

export const AppNavigator = () => {

  const { scheme } = useContext(AppThemeContext)

  const About = () => {
    return (
      <SafeArea>
        <View style={{ flex: 1, backgroundColor: scheme == "light" ? "white" : "black" }}>
          <Text style={{ color: scheme == "light" ? "black" : "white" }}>About section!!!</Text>
        </View>
      </SafeArea>
    )
  }

  const Contact = () => {
    return (
      <SafeArea>
        <View style={{ flex: 1, backgroundColor: scheme == "light" ? "white" : "black" }}>
          <Text style={{ color: scheme == "light" ? "black" : "white" }}>Contact section!!!</Text>
        </View>
      </SafeArea>
    )
  }

  return (
    <FavouritesContextProvider>
      <RestaurantContextProvider>
        <CartContextProvider>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ color, size }) => {
                let iconName;

                if (route.name === 'Home') {
                  iconName = "home-outline"
                } else if (route.name === 'Profile') {
                  return <AntDesign name="profile" size={size} color={color} />
                } else if (route.name === "Contact") {
                  return <AntDesign name="customerservice" size={size} color={color} />
                } else if (route.name === "About") {
                  iconName = "information-circle-outline"
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
            {/*<Tab.Screen name="Contact" component={Contact} />*/}
            <Tab.Screen name="Settings" component={SettingsNavigator} />
            {/*<Tab.Screen name="About" component={About} />*/}
          </Tab.Navigator>
        </CartContextProvider>
      </RestaurantContextProvider>
    </FavouritesContextProvider >
  );
}
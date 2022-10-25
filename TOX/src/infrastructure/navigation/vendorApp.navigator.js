import React, { useContext } from 'react'
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from '@expo/vector-icons';
import { AppThemeContext } from '../../services/common/theme.context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SettingsNavigator } from './settings.navigator';
import { ProfileScreen } from '../../features/settings/screens/profile.screens';
import { VendorHomeNavigator } from './vendorHome.navigator';
import { VendorRestaurantContextProvider } from '../../services/restaurant/vendorRestaurant.context';
const Tab=createBottomTabNavigator()

export const VendorAppNavigator = () => {

    const { scheme }=useContext(AppThemeContext)

    return(
      <VendorRestaurantContextProvider>
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
              <Tab.Screen name="Home" component={VendorHomeNavigator} />
              <Tab.Screen name="Profile" component={ProfileScreen} />
              <Tab.Screen name="Settings" component={SettingsNavigator} />
            </Tab.Navigator>
            </VendorRestaurantContextProvider>
    )
}
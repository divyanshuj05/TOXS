import React from "react";
import { Text, View } from "react-native";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { ThemeProvider } from "styled-components/native";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from "@expo/vector-icons";
import { theme } from "./src/infrastructure/theme/index";
import { RestaurantScreen } from "./src/features/restaurants/screens/restaurants.screens";
import { useFonts as OswaldFont, Oswald_400Regular } from '@expo-google-fonts/oswald';
import { useFonts as LatoFont, Lato_400Regular } from '@expo-google-fonts/lato';

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

  const Tab = createBottomTabNavigator();

  const Settings = () => {
    return (
      <View>
        <Text>Settings tab!!!</Text>
      </View>
    )
  }

  const Map = () => {
    return (
      <View>
        <Text>Map tab!!!</Text>
      </View>
    )
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ color, size }) => {
                let iconName;

                if (route.name === 'Restaurants') {
                  iconName = "restaurant-outline"
                } else if (route.name === 'Settings') {
                  iconName = "settings"
                }
                else if (route.name === "Maps") {
                  iconName = "map"
                }

                return <Ionicons name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: 'blue',
              tabBarInactiveTintColor: 'gray',
            })}
          >
            <Tab.Screen name="Restaurants" component={RestaurantScreen} />
            <Tab.Screen name="Maps" component={Map} />
            <Tab.Screen name="Settings" component={Settings} />
          </Tab.Navigator>
        </NavigationContainer>
      </ThemeProvider>
      <ExpoStatusBar style="auto" />
    </>
  );
}
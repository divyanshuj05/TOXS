import React from "react";
import { Text, View } from "react-native";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { ThemeProvider } from "styled-components/native";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from '@expo/vector-icons';
import { theme } from "./src/infrastructure/theme/index";
import { useFonts as OswaldFont, Oswald_400Regular } from '@expo-google-fonts/oswald';
import { useFonts as LatoFont, Lato_400Regular } from '@expo-google-fonts/lato';
import { HomeScreen } from "./src/features/common/screens/home.screens";

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

  const Profile = () => {
    return (
      <View>
        <Text>Profile tab!!!</Text>
      </View>
    )
  }

  const Contact = () => {
    return (
      <View>
        <Text>Contact tab!!!</Text>
      </View>
    )
  }

  const About = () => {
    return (
      <View>
        <Text>About tab!!!</Text>
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

                if (route.name === 'Home') {
                  iconName = "home-outline"
                } else if (route.name === 'Profile') {
                  iconName = "person"
                } else if (route.name === "Contact") {
                  return <AntDesign name="customerservice" size={size} color={color} />
                } else if (route.name === "About") {
                  iconName = "information-circle-outline"
                }

                return <Ionicons name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: 'red',
              tabBarInactiveTintColor: 'gray',
            })}
          >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Profile" component={Profile} />
            <Tab.Screen name="Contact" component={Contact} />
            <Tab.Screen name="About" component={About} />
          </Tab.Navigator>
        </NavigationContainer>
      </ThemeProvider>
      <ExpoStatusBar style="auto" />
    </>
  );
}
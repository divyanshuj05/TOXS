import React, { useContext } from "react";
import { useNavigationState, useRoute } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { HomeNavigator } from "./home.navigator.js";
import { AppThemeContext } from "../../services/common/theme.context.js";
import { AccountNavigator } from "./account.navigator.js";
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

export const AppNavigator = () => {

  const { scheme } = useContext(AppThemeContext)

  return (
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
          tabBarStyle: { backgroundColor: scheme === 'dark' ? "black" : "white" },
          headerShown: false
        })}
      >
        <Tab.Screen name="Home" component={HomeNavigator} />
        <Tab.Screen name="Profile" component={Profile} />
        <Tab.Screen name="Contact" component={Contact} />
        <Tab.Screen name="About" component={About} />
      </Tab.Navigator>
  );
}
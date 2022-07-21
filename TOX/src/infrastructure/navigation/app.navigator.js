import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { Text,View } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { RestaurantScreen } from "../../features/restaurants/screens/restaurants.screens";
/*import { SafeArea } from "../../components/utility/safe-area.component";*/
import { HomeScreen } from "../../features/common/screens/home.screens";
import { RestaurantsNavigator } from "./restaurants.navigator";
import { HomeNavigator } from "./home.navigator.js";
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


const createScreenOptions = ({ route }) => {
  const iconName = TAB_ICON[route.name];
  return {
    tabBarIcon: ({ size, color }) => (
      <Ionicons name={iconName} size={size} color={color} />
    ),
  };
};

export const AppNavigator = () => (
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ color, size }) => {
                let iconName;

                if (route.name === 'Home') {
                  iconName = "home-outline"
                } else if (route.name === 'Profile') {
                  iconName = "person"
                } else if (route.name === 'Cafeteria') {
                  iconName = "restaurant"
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
            <Tab.Screen name="Cafeteria" component={RestaurantsNavigator} />
            <Tab.Screen name="Profile" component={Profile} />
            <Tab.Screen name="Contact" component={Contact} />
            <Tab.Screen name="About" component={About} />
          </Tab.Navigator>
        </NavigationContainer>

);
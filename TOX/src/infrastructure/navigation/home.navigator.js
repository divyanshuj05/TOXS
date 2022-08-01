import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen } from "../../features/common/screens/home.screens";
import { RestaurantScreen } from "../../features/restaurants/screens/restaurants.screens";
import { RestaurantsNavigator } from "./restaurants.navigator";

const HomeStack = createStackNavigator();

export const HomeNavigator = () => {
  return (
    <HomeStack.Navigator screenOptions={{
      headerShown: false
    }} >
      <HomeStack.Screen
        name="home"
        component={HomeScreen}
      />
      <HomeStack.Screen
        name="RestaurantNavigator"
        component={RestaurantsNavigator}
      />
    </HomeStack.Navigator>
  );
};

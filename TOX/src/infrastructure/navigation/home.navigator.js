import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen } from "../../features/common/screens/home.screens";
import { ExchangeScreen } from "../../features/exchnages/screens/exchnage.screens"
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
      <HomeStack.Screen
        name="Exchnage"
        component={RestaurantsNavigator}
      />
    </HomeStack.Navigator>
  );
};

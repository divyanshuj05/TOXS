import React from "react";
import { Text } from "react-native";

import { TransitionPresets, createStackNavigator } from "@react-navigation/stack";
import { HomeScreen } from "../../features/common/screens/home.screens";
import { RestaurantScreen } from "../../features/restaurants/screens/restaurants.screens";

const HomeStack = createStackNavigator();

export const HomeNavigator = () => {
  return (
    <HomeStack.Navigator >
      <HomeStack.Screen
        name="home"
        component={HomeScreen}
      />
      <HomeStack.Screen
        name="Restaurants"
        component={RestaurantScreen}
      />
    </HomeStack.Navigator>
  );
};

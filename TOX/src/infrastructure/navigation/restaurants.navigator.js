import React from "react";

import { TransitionPresets, createStackNavigator } from "@react-navigation/stack";
import { Text } from "react-native";
import { RestaurantScreen } from "../../features/restaurants/screens/restaurants.screens";
import { RestaurantDetails } from "../../features/restaurants/screens/restaurant-details.screens";

const RestaurantStack = createStackNavigator();

export const RestaurantsNavigator = () => {
  return (
    <RestaurantStack.Navigator screenOptions={{ headerShown: false }}>
      <RestaurantStack.Screen
        name="Restaurants"
        component={RestaurantScreen}
      />
      <RestaurantStack.Screen
        name="RestaurantsDetail"
        component={RestaurantDetails}
      />
    </RestaurantStack.Navigator>
  );
};
import React from "react";

import { TransitionPresets, createStackNavigator } from "@react-navigation/stack";
import { Text } from "react-native";
import { RestaurantScreen } from "../../features/restaurants/screens/restaurants.screens";

const RestaurantStack = createStackNavigator();

export const RestaurantsNavigator = () => {
  return (
    <RestaurantStack.Navigator >
      <RestaurantStack.Screen
        name="Restaurants"
        component={RestaurantScreen}
      />

          <RestaurantStack.Screen
            name="RestaurantsDetail"
            component={() =><Text>Restaurant Detail</Text>}
          />
    </RestaurantStack.Navigator>
  );
};
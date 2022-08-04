import React from "react";
import { TransitionPresets, createStackNavigator } from "@react-navigation/stack";
import { RestaurantScreen } from "../../features/restaurants/screens/restaurants.screens";
import { RestaurantDetails } from "../../features/restaurants/screens/restaurant-details.screens";
import { PaymentScreen } from "../../features/restaurants/screens/payments.screens";

const RestaurantStack = createStackNavigator();

export const RestaurantsNavigator = () => {
  return (
    <RestaurantStack.Navigator screenOptions={{ headerShown: false, ...TransitionPresets.ModalPresentationIOS }}>
      <RestaurantStack.Screen
        name="Restaurants"
        component={RestaurantScreen}
      />
      <RestaurantStack.Screen
        name="RestaurantsDetail"
        component={RestaurantDetails}
      />
      <RestaurantStack.Screen
        name="Payments"
        component={PaymentScreen}
      />
    </RestaurantStack.Navigator>
  );
};
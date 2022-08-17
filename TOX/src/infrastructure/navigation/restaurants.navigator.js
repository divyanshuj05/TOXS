import React from "react";
import { TransitionPresets, createStackNavigator } from "@react-navigation/stack";
import { RestaurantScreen } from "../../features/restaurants/screens/restaurants.screens";
import { RestaurantDetails } from "../../features/restaurants/screens/restaurant-details.screens";
import { OrderListScreen } from "../../features/restaurants/screens/order-list.screens";
import { PaymentScreen } from "../../features/restaurants/screens/payment.screens";

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
        name="OrderList"
        component={OrderListScreen}
      />
      <RestaurantStack.Screen
        name="Payments"
        component={PaymentScreen}
      />
    </RestaurantStack.Navigator>
  );
};
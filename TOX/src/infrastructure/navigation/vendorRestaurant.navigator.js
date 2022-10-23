import React from "react";
import { TransitionPresets, createStackNavigator } from "@react-navigation/stack";
import { VendorRestaurantScreen } from "../../features/restaurants/screens/vendorRestaurants.screens";
import { VendorRestaurantDetail } from "../../features/restaurants/screens/vendorRestaurantDetail.screens";

const RestaurantStack = createStackNavigator();

export const VendorRestaurantsNavigator = () => {
  return (
    <RestaurantStack.Navigator screenOptions={{ headerShown: false, ...TransitionPresets.ModalPresentationIOS }}>
      <RestaurantStack.Screen
        name="Restaurants"
        component={VendorRestaurantScreen}
      />
      <RestaurantStack.Screen
        name="RestaurantDetails"
        component={VendorRestaurantDetail}
      />
    </RestaurantStack.Navigator>
  );
};
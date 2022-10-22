import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { VendorHome } from "../../features/common/screens/vendorHome.screens";
import { VendorRestaurantsNavigator } from "./vendorRestaurant.navigator";
import { VendorOrderScreen } from "../../features/restaurants/screens/vendorOrders.screens";

const VendorHomeStack = createStackNavigator();

export const VendorHomeNavigator = () => {
  return (
    <VendorHomeStack.Navigator initialRouteName="home" screenOptions={{
      headerShown: false
    }} >
      <VendorHomeStack.Screen
        name="home"
        component={VendorHome}
      />
      <VendorHomeStack.Screen
        name="VendorRestaurantNavigator"
        component={VendorRestaurantsNavigator}
      />
      <VendorHomeStack.Screen
        name="VendorOrders"
        component={VendorOrderScreen}
        />
    </VendorHomeStack.Navigator>
  );
};

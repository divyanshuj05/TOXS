import React from "react";
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";
import { VendorHome } from "../../features/common/screens/vendorHome.screens";
import { VendorRestaurantsNavigator } from "./vendorRestaurant.navigator";
import { VendorHistoryNavigator } from "./vendorOrderHistory.navigator";

const VendorHomeStack = createStackNavigator();

export const VendorHomeNavigator = () => {
  return (
    <VendorHomeStack.Navigator initialRouteName="home" screenOptions={{
      headerShown: false,
      ...TransitionPresets.SlideFromRightIOS
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
        name="RestaurantsHome"
        component={VendorHistoryNavigator}
        />
    </VendorHomeStack.Navigator>
  );
};

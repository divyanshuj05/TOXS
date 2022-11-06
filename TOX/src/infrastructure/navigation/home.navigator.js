import React from "react";
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";
import { HomeScreen } from "../../features/common/screens/home.screens";
import { RestaurantsNavigator } from "./restaurants.navigator";
import { ExchangeNavigator } from "./exchange.navigator";

const HomeStack = createStackNavigator();

export const HomeNavigator = () => {

  return (
    <HomeStack.Navigator screenOptions={{
        headerShown: false,
        ...TransitionPresets.SlideFromRightIOS  
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
          component={ExchangeNavigator}
        />
      </HomeStack.Navigator>
  );
};

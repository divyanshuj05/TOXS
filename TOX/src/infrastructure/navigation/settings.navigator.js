import React from "react";
import { SettingsScreen } from "../../features/settings/screens/settings.screen";
import { FavSettingsScreen } from "../../features/settings/screens/favourites.screens";

import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";

const SettingsStack = createStackNavigator();

export const SettingsNavigator = ({ route, navigation }) => {
  return (
    <SettingsStack.Navigator
      headerMode="screen"
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.ModalPresentationIOS
      }}
    >
      <SettingsStack.Screen
        options={{
          header: () => null,
        }}
        name="SettingsHome"
        component={SettingsScreen}
      />
      <SettingsStack.Screen name="Favourites" component={FavSettingsScreen} />
    </SettingsStack.Navigator>
  );
};
import React, { useContext } from "react";
import { SettingsScreen } from "../../features/settings/screens/settings.screen";
import { FavSettingsScreen } from "../../features/settings/screens/favourites.screens";
import { DeviceOrientationContext } from "../../services/common/deviceOrientation.context";
import { AppThemeContext } from "../../services/common/theme.context";
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";
import { View } from "react-native"
import { ActivityIndicator, Colors } from "react-native-paper";

const SettingsStack = createStackNavigator();

export const SettingsNavigator = ({ navigation }) => {

  const { scheme } = useContext(AppThemeContext)
  const { isOrientationLoading } = useContext(DeviceOrientationContext)

  return (
    <>
    {isOrientationLoading?
      (
        <View style={{ flex:1,backgroundColor:scheme === "dark" ? "black" : "white" }}>
          <ActivityIndicator style={{marginTop:50}} color={Colors.red400} size={50} />
        </View>
      ):
      (
      <SettingsStack.Navigator
        screenOptions={{
          headerShown: false,
          ...TransitionPresets.ModalPresentationIOS
        }}
        >
        <SettingsStack.Screen
          screenOptions={{
            headerShown: false,
          }}
          name="SettingsHome"
          component={SettingsScreen}
        />
        <SettingsStack.Screen 
          name="Favourites" 
          component={FavSettingsScreen} />
      </SettingsStack.Navigator>
      )
    }
    </>
    
  );
};
import React, { useContext } from "react";
import { View } from "react-native"
import { TransitionPresets, createStackNavigator } from "@react-navigation/stack";
import { VendorRestaurantScreen } from "../../features/restaurants/screens/vendorRestaurants.screens";
import { VendorRestaurantDetail } from "../../features/restaurants/screens/vendorRestaurantDetail.screens";
import { DeviceOrientationContext } from "../../services/common/deviceOrientation.context";
import { AppThemeContext } from "../../services/common/theme.context";
import { ActivityIndicator,Colors } from "react-native-paper";

const RestaurantStack = createStackNavigator();

export const VendorRestaurantsNavigator = () => {

  const { isOrientationLoading } = useContext(DeviceOrientationContext)
  const { scheme } = useContext(AppThemeContext)

  if(isOrientationLoading)
  {
    return(
        <View style={{ flex:1,backgroundColor:scheme === "dark" ? "black" : "white" }}>
            <ActivityIndicator style={{marginTop:50}} color={Colors.red400} size={50} />
        </View>
    )
  }

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
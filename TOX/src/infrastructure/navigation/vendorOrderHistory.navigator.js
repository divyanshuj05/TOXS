import React, { useContext } from "react";
import { View } from "react-native"
import { TransitionPresets, createStackNavigator } from "@react-navigation/stack";
import { DeviceOrientationContext } from "../../services/common/deviceOrientation.context";
import { AppThemeContext } from "../../services/common/theme.context";
import { ActivityIndicator,Colors } from "react-native-paper";
import { OrderHistory } from "../../features/restaurants/screens/orderHistory.screens";
import { OrderDetails } from "../../features/restaurants/screens/historyData.screens";

const RestaurantStack = createStackNavigator();

export const VendorHistoryNavigator = () => {

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
        name="Order History"
        component={OrderHistory}
      />
      <RestaurantStack.Screen
        name="OrderDetail"
        component={OrderDetails}
      />
    </RestaurantStack.Navigator>
  );
};
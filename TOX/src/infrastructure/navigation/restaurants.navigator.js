import React, { useContext } from "react";
import { View } from "react-native"
import { TransitionPresets, createStackNavigator } from "@react-navigation/stack";
import { RestaurantHome } from "../../features/restaurants/screens/restaurantHome.screens";
import { RestaurantScreen } from "../../features/restaurants/screens/restaurants.screens";
import { RestaurantDetails } from "../../features/restaurants/screens/restaurant-details.screens";
import { OrderListScreen } from "../../features/restaurants/screens/order-list.screens";
import { PaymentScreen } from "../../features/restaurants/screens/payment.screens";
import { AppThemeContext } from "../../services/common/theme.context";
import { ActivityIndicator, Colors } from "react-native-paper";
import { DeviceOrientationContext } from "../../services/common/deviceOrientation.context";

const RestaurantStack = createStackNavigator();

export const RestaurantsNavigator = () => {

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
        name="RestaurantsHome"
        component={RestaurantHome}
      />
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
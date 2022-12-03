import React from 'react'
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";
import { DeliveryHome } from '../../features/restaurants/screens/deliveryHome.screens';
import { OrderHistory } from '../../features/restaurants/screens/orderHistory.screens';
import { RestaurantHistoryContextProvider } from '../../services/restaurant/orderHistory.context';
import { OrderDetails } from '../../features/restaurants/screens/historyData.screens';

export const DeliveryApp = () => {

    const DeliveryStack = createStackNavigator();

    return(
        <RestaurantHistoryContextProvider>
            <DeliveryStack.Navigator initialRouteName="home" screenOptions={{
            headerShown: false,
            ...TransitionPresets.SlideFromRightIOS
            }}>
                <DeliveryStack.Screen
                    name="home"
                    component={DeliveryHome}
                />
                <DeliveryStack.Screen
                    name="OrderHistory"
                    component={OrderHistory}
                />
                <DeliveryStack.Screen
                    name="OrderDetail"
                    component={OrderDetails}
                />
            </DeliveryStack.Navigator>
        </RestaurantHistoryContextProvider>
    )
}
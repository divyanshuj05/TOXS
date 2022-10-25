import React from 'react'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import { ExchangeHome } from '../../features/exchnages/screens/exchangeHome.screens'
import { SellScreen } from '../../features/exchnages/screens/exchnageSell.screens'
import { BuyScreen } from '../../features/exchnages/screens/exchangeBuy.screens'

const ExchnageStack=createStackNavigator()

export const ExchangeNavigator = () => {
    return(
    <ExchnageStack.Navigator screenOptions={{ headerShown: false, ...TransitionPresets.ModalPresentationIOS }}>
      <ExchnageStack.Screen
        name="ExchangeHome"
        component={ExchangeHome}
      />
      <ExchnageStack.Screen
        name="SellHome"
        component={SellScreen}
      />
      <ExchnageStack.Screen
        name="BuyHome"
        component={BuyScreen}
      />
    </ExchnageStack.Navigator>
    )
}
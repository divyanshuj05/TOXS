import React from 'react'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import { ExchangeHome } from '../../features/exchnages/screens/exchangeHome.screens'
import { SellScreen } from '../../features/exchnages/screens/exchnageSell.screens'
import { BuyScreen } from '../../features/exchnages/screens/exchangeBuy.screens'
import { ExchangeHistory } from '../../features/exchnages/screens/exchangeHistory.screens'
import { ItemDetails } from '../../features/exchnages/screens/itemDetails.screens'

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
      <ExchnageStack.Screen
        name="History"
        component={ExchangeHistory}
      />
      <ExchnageStack.Screen
        name="ItemDetails"
        component={ItemDetails}
      />
    </ExchnageStack.Navigator>
    )
}
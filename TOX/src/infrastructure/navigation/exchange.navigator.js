import React, { useContext } from 'react'
import { View, ActivityIndicator } from 'react-native'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import { ExchangeHome } from '../../features/exchnages/screens/exchangeHome.screens'
import { SellScreen } from '../../features/exchnages/screens/exchnageSell.screens'
import { BuyScreen } from '../../features/exchnages/screens/exchangeBuy.screens'
import { ExchangeHistory } from '../../features/exchnages/screens/exchangeHistory.screens'
import { ItemDetails } from '../../features/exchnages/screens/itemDetails.screens'
import { AppThemeContext } from '../../services/common/theme.context'
import { DeviceOrientationContext } from '../../services/common/deviceOrientation.context'
import { BuyersList } from '../../features/exchnages/screens/buyersList.screens'

const ExchnageStack=createStackNavigator()

export const ExchangeNavigator = () => {

  const { isOrientationLoading } = useContext(DeviceOrientationContext)
  const { scheme } = useContext(AppThemeContext)

  if(isOrientationLoading)
  {
    return(
        <View style={{ flex:1,backgroundColor:scheme === "dark" ? "black" : "white" }}>
            <ActivityIndicator style={{marginTop:50}} color="purple" size={50} />
        </View>
    )
  }

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
      <ExchnageStack.Screen
        name="BuyersList"
        component={BuyersList}
      />
    </ExchnageStack.Navigator>
    )
}
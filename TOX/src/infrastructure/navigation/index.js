import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AppNavigator } from "./app.navigator";
import { VendorAppNavigator } from "./vendorApp.navigator";
import { AccountNavigator } from "./account.navigator";
import { AuthenticationContext } from "../../services/authentication/authentication.context";
import { ActivityIndicator, Colors } from "react-native-paper";
import { View } from "react-native"
import { DeliveryApp } from "./deliveryApp.navigator";

export const Navigation = () => {
  const { isAuthenticated, isLogging, user } = useContext(AuthenticationContext);

  if (isLogging) {
    return (
      <View style={{ justifyContent: "center", flex: 1 }}>
        <ActivityIndicator color={Colors.blue300} size={50} />
      </View>
    )
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? 
      (
        user.type=="users"?
        (
          <AppNavigator />
        ):
        (
          user.type=="vendors"?
          (
            <VendorAppNavigator />
          ):
          (
            <DeliveryApp />
          )
        )
      ) : 
      (<AccountNavigator />)}
    </NavigationContainer>
  );
};
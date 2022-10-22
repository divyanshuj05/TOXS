import React from "react";
import { View } from "react-native";
import LottieView from "lottie-react-native";
import { SafeArea } from "../../../utils/components/safe-area.components"
import { Spacer } from "../../common/components/spacer/spacer.component";
import { AccountBackground, AccountContainer, AccountCover, AuthButton, Title, AnimationWrapper, } from "../components/account.styles";

export const AccountScreen = ({ navigation }) => {

  return (
    <SafeArea>
      <AccountBackground>
        <AccountCover />
        <AnimationWrapper>
          <LottieView
            key="animation"
            autoPlay
            loop
            resizeMode="cover"
            source={require("../../../../assets/watermelon.json")}
          />
        </AnimationWrapper>
        <Title>TOXs</Title>
        <AccountContainer>
          <AuthButton
            icon="login"
            mode="contained"
            onPress={() => navigation.navigate("Login", {collection:"users"} )}
          >
            User Login
          </AuthButton>
          <Spacer size="large">
            <AuthButton
              icon="email"
              mode="contained"
              onPress={() => navigation.navigate("Register")}
            >
              Register
            </AuthButton>
          </Spacer>
        </AccountContainer>
        <View style={{marginTop:50}}>
        <AccountContainer>
          <Spacer size="small">
            <AuthButton
              icon="login"
              mode="contained"
              onPress={() => navigation.navigate("Login",{collection:"vendors"})}>
              Vendor Login
            </AuthButton>
          </Spacer>
  </AccountContainer></View>
      </AccountBackground>
    </SafeArea>
  );
};
import React, { useContext } from "react";
import { View } from "react-native";
import LottieView from "lottie-react-native";
import { SafeArea } from "../../../utils/components/safe-area.components"
import { Spacer } from "../../common/components/spacer/spacer.component";
import { AccountBackground, AccountContainer, AccountCover, AuthButton, Title, AnimationWrapper, AnimationWrapperLand } from "../components/account.styles";
import { DeviceOrientationContext } from "../../../services/common/deviceOrientation.context";

export const AccountScreen = ({ navigation }) => { 

  const { orientation } = useContext(DeviceOrientationContext)

  const UserView = () =>{
    return(
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
    )
  }
  
  const VendorView = () => {
    return(
        <AccountContainer>
          <Spacer size="small">
            <AuthButton
              icon="login"
              mode="contained"
              onPress={() => navigation.navigate("Login",{collection:"vendors"})}>
              Vendor Login
            </AuthButton>
          </Spacer>
          <Spacer size="large">
            <AuthButton
              icon="login"
              mode="contained"
              onPress={() => navigation.navigate("DeliveryLogin")}>
              Delivery Login
            </AuthButton>
          </Spacer>
        </AccountContainer>
    )
  }

  if(orientation==1||orientation==2)
  {
    return(
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
          <View style={{marginTop:250}}>
          <Title>TOXs</Title></View>
          {UserView()}
          {VendorView()}
        </AccountBackground>
      </SafeArea>
    )
  }
  else{
    return(
      <SafeArea>
        <AccountBackground>
              <AnimationWrapperLand>
                  <LottieView
                    key="animation"
                    autoPlay
                    loop
                    resizeMode="cover"
                    style={{width:275,height:275}}
                    source={require("../../../../assets/watermelon.json")}
                  />
                </AnimationWrapperLand>
              <View style={{flexDirection:"row", flex:0.7}}>
                <View style={{flex:0.5}}>
                  {UserView()}
                </View>
                <Title>TOXs</Title>
                <View style={{flex:0.5}}>
                  {VendorView()}
                </View>
              </View>
        </AccountBackground>
      </SafeArea>
    )
  }
};
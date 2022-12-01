import React, { useState, useContext } from "react";
import { View, ScrollView } from "react-native";
import { ActivityIndicator, Colors } from "react-native-paper";
import { SafeArea } from "../../../utils/components/safe-area.components";
import {
  AccountBackground,
  AuthButton,
  AuthInput,
  ErrorContainer,
  AuthInputLand
} from "../components/account.styles";
import { Text } from "../../common/components/typography/text.component";
import { Spacer } from "../../common/components/spacer/spacer.component";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import styled from "styled-components";
import { DeviceOrientationContext } from "../../../services/common/deviceOrientation.context";

const Title = styled(Text)`
  text-align:center
  font-size: 30px;
  margin-top:92px
`;

const AccountContainer = styled(View)`
  background-color: rgba(255, 255, 255, 0.7);
  padding: ${(props) => props.theme.space[4]};
  margin-vertical:${(props) => props.theme.space[2]};
  margin-horizontal: ${(props) => props.theme.space[3]};
  border-radius:12px;
`;

export const LoginScreen = ({ route,navigation }) => {
  const {collection}=route.params
  
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { onLogin, error, isLoading, setError } = useContext(AuthenticationContext);
  const { orientation } = useContext(DeviceOrientationContext)

  const ContentView = () => {
    return(
      <>
        <AccountContainer>
          {orientation==1||orientation==2?
          (
            <>
              <AuthInput
              label="User Name"
              value={userName}
              textContentType="username"
              keyboardType="default"
              autoCapitalize="words"
              onChangeText={(u) => setUserName(u)}
            />
            <Spacer size="large">
              <AuthInput
                label="Password"
                value={password}
                textContentType="password"
                secureTextEntry
                autoCapitalize="none"
                onChangeText={(p) => setPassword(p)}
              />
              </Spacer>
            </>
          ):(
            <>
              <AuthInputLand
              label="User Name"
              value={userName}
              textContentType="username"
              keyboardType="default"
              autoCapitalize="words"
              onChangeText={(u) => setUserName(u)}
            />
            <Spacer size="large">
              <AuthInputLand
                label="Password"
                value={password}
                textContentType="password"
                secureTextEntry
                autoCapitalize="none"
                onChangeText={(p) => setPassword(p)}
              />
              </Spacer>
            </>
          )}
        {error && (
          <ErrorContainer size="large">
            <Text variant="error">{error}</Text>
          </ErrorContainer>
        )}
        <Spacer size="xl">
          {!isLoading ? (
            <>
              <AuthButton
              icon="food"
              mode="contained"
              onPress={() => { setError(null), onLogin(userName, password,collection) }}
            >
              Login
            </AuthButton>
            <View style={{marginVertical:16}}></View>
              <AuthButton
                icon="account-reactivate"
                mode="contained"
                onPress={() => { navigation.navigate("ForgotPassword", {collection:collection}) }}
              >
                Forgot Password
              </AuthButton>
            </>
          ) : (
            <ActivityIndicator animating={true} color={Colors.blue300} />
          )}
        </Spacer>
      </AccountContainer>
      </>
    )
  }

  const BackButtonView = () => {
    return(
      <Spacer size="xl">
        <View style={{marginHorizontal:48, marginTop:32}}>
        <AuthButton mode="contained" onPress={() => { setError(null), navigation.goBack() }}>
          Back
        </AuthButton>
        </View>
      </Spacer>
    )
  }

  if(orientation==1||orientation==2)
  {
    return(
      <ScrollView contentContainerStyle={{flexGrow:1}} keyboardShouldPersistTaps={'handled'}>
      <SafeArea>
        <AccountBackground>
          <Title>TOXs</Title>
          <View style={{marginVertical:16}}>
            {ContentView()}
            {BackButtonView()}
          </View>
        </AccountBackground>
      </SafeArea></ScrollView>
    )
  }
  else{
    return(
      <SafeArea>
        <AccountBackground>
          <View style={{flexDirection:"row"}}>
            <View style={{flex:0.65}}>
              <Title>TOXs</Title>
              {BackButtonView()}
            </View>
            <ScrollView style={{flex:0.35}} contentContainerStyle={{flexGrow:1}} keyboardShouldPersistTaps={'handled'}>
              {ContentView()}
            </ScrollView>
          </View>
        </AccountBackground>
      </SafeArea>
    )
  }
};
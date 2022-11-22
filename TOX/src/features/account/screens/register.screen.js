import React, { useState, useContext } from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import { ActivityIndicator, Colors } from "react-native-paper";
import { AccountBackground, AuthButton, AuthInput, ErrorContainer } from "../components/account.styles";
import { Text } from "../../common/components/typography/text.component";
import { Spacer } from "../../common/components/spacer/spacer.component";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import { DeviceOrientationContext } from "../../../services/common/deviceOrientation.context";
import { SafeArea } from "../../../utils/components/safe-area.components";
import styled from "styled-components";
import { SecurityDropdown } from "../components/securityDropdown.components";

const Title = styled(Text)`
  text-align:center
  font-size: 30px;
  margin-top:35px
`;

const TitleLand=styled(Text)`
  text-align:center
  font-size: 30px;
  margin-top:97px;
`;

const AccountContainer = styled(View)`
  background-color: rgba(255, 255, 255, 0.7);
  padding: ${(props) => props.theme.space[4]};
  margin-vertical:${(props) => props.theme.space[2]};
  margin-horizontal: ${(props) => props.theme.space[3]};
`;

export const RegisterScreen = ({ navigation }) => {

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [MobileNo, setMobileNo] = useState("");
  const [password, setPassword] = useState("");
  const [securityQuestionOne,setSecurityQuestionOne]=useState(null)
  const [securityOne,setSecurityOne] = useState("")
  const [securityQuestionTwo,setSecurityQuestionTwo]=useState(null)
  const [securityTwo,setSecurityTwo] = useState("")
  const { onRegister, isLoading, error, setError } = useContext(AuthenticationContext);
  const { orientation } = useContext(DeviceOrientationContext)

  const RegisterView = () => {
    return(
        <AccountContainer>
          <View style={{ height: orientation==1||orientation==2?400:undefined }}>
            <ScrollView>
              <AuthInput
                style={{width:orientation==1||orientation==2?287:400,height:50}}
                label="User Name"
                value={userName}
                textContentType="username"
                keyboardType="default"
                autoCapitalize="words"
                onChangeText={(u) => setUserName(u)}
              />
              <Spacer size="large">
                <AuthInput
                  style={{width:orientation==1||orientation==2?287:400,height:50}}
                  label="E-mail"
                  value={email}
                  textContentType="emailAddress"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onChangeText={(u) => setEmail(u)}
                />
              </Spacer>
              <Spacer size="large">
                <AuthInput
                  style={{width:orientation==1||orientation==2?287:400,height:50}}
                  label="Mobile No"
                  value={MobileNo}
                  textContentType="telephoneNumber"
                  keyboardType="phone-pad"
                  autoCapitalize="none"
                  onChangeText={(u) => setMobileNo(u)}
                />
              </Spacer>
              <Spacer size="large">
                <AuthInput
                  style={{width:orientation==1||orientation==2?287:400,height:50}}
                  label="Password"
                  value={password}
                  textContentType="password"
                  secureTextEntry
                  autoCapitalize="none"
                  onChangeText={(p) => setPassword(p)}
                />
              </Spacer>
              <SecurityDropdown setSecurityQuestion={setSecurityQuestionOne} securityQuestion={securityQuestionOne} security={securityOne} setSecurity={setSecurityOne} />
              <SecurityDropdown setSecurityQuestion={setSecurityQuestionTwo} securityQuestion={securityQuestionTwo} security={securityTwo} setSecurity={setSecurityTwo} />
            </ScrollView>
          </View>
          {error && (
            <ErrorContainer size="large">
              <Text variant="error">{error}</Text>
            </ErrorContainer>
          )}
          <Spacer size="large">
            {!isLoading ? (
              <AuthButton
                icon="food"
                mode="contained"
                onPress={() => { setError(null), onRegister(userName, email, MobileNo, password,securityQuestionOne,securityOne,securityQuestionTwo,securityTwo) }}
              >
                Register
              </AuthButton>
            ) : (
              <ActivityIndicator animating={true} color={Colors.blue300} />
            )}
          </Spacer>
        </AccountContainer>
    )
  }

  const BackButtonView = () => {
    return (
      <Spacer size="xl">
        <View style={{marginHorizontal:48}}>
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
      <ScrollView contentContainerStyle={{flexGrow:1}}>
      <SafeArea>
        <AccountBackground>
          <Title>TOXs</Title>
          <View style={{marginVertical:16}}>
            {RegisterView()}
            {BackButtonView()}
          </View>
        </AccountBackground>
      </SafeArea>
      </ScrollView>
    )
  }
  else{
    return(
      <SafeArea>
        <AccountBackground>
          <View style={{flexDirection:"row"}}>
            <View style={{flex:0.4}}>
              <TitleLand>TOXs</TitleLand>
              {BackButtonView()}
            </View>
            <View style={{flex:0.6}}>
              <ScrollView>
                {RegisterView()}
              </ScrollView>
            </View>
          </View>
        </AccountBackground>
      </SafeArea>
    )
  }
};
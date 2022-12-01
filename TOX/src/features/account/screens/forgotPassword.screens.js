import React, { useState, useContext } from 'react';
import { View, ScrollView } from "react-native";
import styled from "styled-components";
import { SafeArea } from '../../../utils/components/safe-area.components';
import { AccountBackground, AuthInput, AuthInputLand, AuthButton, ErrorContainer } from '../components/account.styles';
import { Text } from '../../common/components/typography/text.component';
import { Spacer } from '../../common/components/spacer/spacer.component';
import { DeviceOrientationContext } from '../../../services/common/deviceOrientation.context';
import { AuthenticationContext } from '../../../services/authentication/authentication.context';
import { ActivityIndicator,Colors } from 'react-native-paper';
import { SecurityDropdown } from '../components/securityDropdown.components';

const Title = styled(Text)`
  text-align:center
  font-size: 30px;
  margin-top:92px;
`;

const AccountContainer = styled(View)`
  background-color: rgba(255, 255, 255, 0.7);
  padding: ${(props) => props.theme.space[4]};
  margin-vertical:${(props) => props.theme.space[2]};
  margin-horizontal: ${(props) => props.theme.space[3]};
  border-radius:12px;
`;

export const ForgotPassword = ({ route,navigation }) => {

    const { collection } = route.params
    const { ForgotPassword, isLoading } = useContext(AuthenticationContext)
    const [error,setError]=useState(null)
    const { orientation } = useContext(DeviceOrientationContext)
    const [userName,setUserName]=useState(null)
    const [securityQuestionOne,setSecurityQuestionOne]=useState(null)
    const [securityOne,setSecurityOne] = useState("")
    const [securityQuestionTwo,setSecurityQuestionTwo]=useState(null)
    const [securityTwo,setSecurityTwo] = useState("")

    const BackButtonView = () => {
        return(
          <Spacer size="xl">
            <View style={{marginHorizontal:48, marginTop:32}}>
            <AuthButton mode="contained" onPress={() => { navigation.goBack() }}>
              Back
            </AuthButton>
            </View>
          </Spacer>
        )
      }

    const ContentView = () => {
        return(
            <>
                <AccountContainer>
                    {orientation==1||orientation==2?
                    (
                        <AuthInput
                          style={{height:50}}
                          label="User Name"
                          value={userName}
                          textContentType="username"
                          keyboardType="default"
                          autoCapitalize="words"
                          onChangeText={(u) => setUserName(u)}
                        />
                    ):
                    (
                        <AuthInputLand
                          style={{height:50}}
                          label="User Name"
                          value={userName}
                          textContentType="username"
                          keyboardType="default"
                          autoCapitalize="words"
                          onChangeText={(u) => setUserName(u)}
                        />
                    )
                    }
                    <SecurityDropdown setSecurityQuestion={setSecurityQuestionOne} securityQuestion={securityQuestionOne} security={securityOne} setSecurity={setSecurityOne} />
                    <SecurityDropdown setSecurityQuestion={setSecurityQuestionTwo} securityQuestion={securityQuestionTwo} security={securityTwo} setSecurity={setSecurityTwo} />
                    {error && (
                      <ErrorContainer size="large">
                        <Text variant="error">{error}</Text>
                      </ErrorContainer>
                    )}
                    <View style={{marginVertical:16}}></View>
                    {isLoading?
                    (
                      <ActivityIndicator animating={true} color={Colors.blue300} />
                    ):
                    (
                      <AuthButton mode="contained" onPress={async() => { setError(await(ForgotPassword(userName,collection,securityQuestionOne,securityOne,securityQuestionTwo,securityTwo))) }}>
                        Generate Password
                      </AuthButton>
                    )
                    }
                </AccountContainer>
            </>
        )
    }  

    if(orientation==1||orientation==2)
    {
        return(
          <ScrollView keyboardShouldPersistTaps={'handled'} contentContainerStyle={{flexGrow:1}}>
            <SafeArea>
                <AccountBackground>
                    <Title style={{marginTop:50}}>TOXs</Title>
                    <View style={{marginVertical:16}}>
                      {ContentView()}
                      {BackButtonView()}
                    </View>
                </AccountBackground>
            </SafeArea>
            </ScrollView>
        )
    }

    return(
        <SafeArea>
        <AccountBackground>
          <View style={{flexDirection:"row"}}>
            <View style={{flex:0.65}}>
              <Title>TOXs</Title>
              {BackButtonView()}
            </View>
            <ScrollView style={{flex:0.35}} contentContainerStyle={{flexGrow:1}}>
              {ContentView()}
            </ScrollView>
          </View>
        </AccountBackground>
      </SafeArea>
    )
}
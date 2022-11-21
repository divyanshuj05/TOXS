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

const Title = styled(Text)`
  text-align:center
  font-size: 30px;
  margin-top:92px;
`;

const AccountContainer = styled(View)`
  background-color: rgba(255, 255, 255, 0.7);
  padding: ${(props) => props.theme.space[4]};
  margin-top:${(props) => props.theme.space[4]};
  margin-horizontal: ${(props) => props.theme.space[3]};
`;

export const ForgotPassword = ({ route,navigation }) => {

    const { collection } = route.params
    const { ForgotPassword, isLoading } = useContext(AuthenticationContext)
    const [error,setError]=useState(null)
    const { orientation } = useContext(DeviceOrientationContext)
    const [userName,setUserName]=useState(null)

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
                            label="User Name"
                            value={userName}
                            textContentType="username"
                            keyboardType="default"
                            autoCapitalize="words"
                            onChangeText={(u) => setUserName(u)}
                        />
                    )
                    }
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
                      <AuthButton mode="contained" onPress={async() => { setError(await(ForgotPassword(userName,collection))) }}>
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
            <SafeArea>
                <AccountBackground>
                    <Title>TOXs</Title>
                    {ContentView()}
                    {BackButtonView()}
                </AccountBackground>
            </SafeArea>
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
import React, { useContext, useState } from 'react'
import { View ,ScrollView, ActivityIndicator } from "react-native"
import { DeviceOrientationContext } from '../../../services/common/deviceOrientation.context'
import { SafeArea } from '../../../utils/components/safe-area.components'
import styled from 'styled-components'
import { AccountBackground, AuthButton, AuthInput,AuthInputLand, ErrorContainer } from '../components/account.styles'
import { Text } from '../../common/components/typography/text.component'
import { Spacer } from '../../common/components/spacer/spacer.component'
import { AuthenticationContext } from '../../../services/authentication/authentication.context'

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

export const DeliveryLogin = ({ navigation }) => {

    const [name,setName]=useState("")
    const [key,setKey]=useState("")
    const { error, setError, isLoading, deliveryLogin} = useContext(AuthenticationContext)
    const { orientation } = useContext(DeviceOrientationContext)

    const Render = () => {
      return(
        <AccountContainer>
          {orientation==1||orientation==2?
          (
            <>
              <AuthInput
                label="Vendor's Cafeteria"
                value={name}
                textContentType="username"
                keyboardType="default"
                autoCapitalize="words"
                onChangeText={(text)=>setName(text)}
              />
              <Spacer size="large">
                <AuthInput
                    label="Vendor's security key"
                    value={key}
                    textContentType="password"
                    secureTextEntry
                    autoCapitalize="none"
                    onChangeText={(text)=>setKey(text)}
                />
              </Spacer>
            </>
          ):
          (
            <>
              <AuthInputLand
                label="Cafeteria Name"
                value={name}
                textContentType="username"
                keyboardType="default"
                autoCapitalize="words"
                onChangeText={(text)=>setName(text)}
              />
              <Spacer size="large">
                <AuthInputLand
                    label="Cafeteria's security key"
                    value={key}
                    textContentType="password"
                    secureTextEntry
                    autoCapitalize="none"
                    onChangeText={(text)=>setKey(text)}
                />
              </Spacer>
            </>
          )
          }
          {error && (
            <ErrorContainer size="large">
                <Text variant="error">{error}</Text>
            </ErrorContainer>
            )}
          <Spacer size="xl">
              {!isLoading ? (
                  <AuthButton
                  icon="food"
                  mode="contained"
                  onPress={() => { deliveryLogin(name,key) }}
                  >
                  Login
                  </AuthButton>
              ) : (
                  <ActivityIndicator size={25} color={"purple"} />
              )}
          </Spacer>
        </AccountContainer>
      )
    }

    const BackButtonView = () => {
        return(
          isLoading?
          (
            <></>
          ):
          (
            <Spacer size="xl">
              <View style={{marginHorizontal:48, marginTop:32}}>
                <AuthButton mode="contained" onPress={() => { setError(null), navigation.goBack() }}>
                  Back
                </AuthButton>
              </View>
            </Spacer>
          )
        )
      }

      if(error)
      {
        setTimeout(()=>{
            setError(null)
        },5000)
      }

    if(orientation==1||orientation==2)
    {
      return(
        <SafeArea>
            <ScrollView keyboardShouldPersistTaps={'handled'} contentContainerStyle={{flexGrow:1}}>
                <AccountBackground>
                    <Title>TOXs</Title>
                    {Render()}
                    {BackButtonView()}
                </AccountBackground>
            </ScrollView>
        </SafeArea>
      )
    }
    return(
      <SafeArea>
            <ScrollView keyboardShouldPersistTaps={'handled'} contentContainerStyle={{flexGrow:1}}>
                <AccountBackground>
                <View style={{flexDirection:"row"}}>
                  <View style={{flex:0.65}}>
                    <Title>TOXs</Title>
                    {BackButtonView()}
                  </View>
                  <ScrollView style={{marginTop:"1.5%",flex:0.35}} contentContainerStyle={{flexGrow:1}} keyboardShouldPersistTaps={'handled'}>
                    {Render()}
                  </ScrollView>
                  </View>
                </AccountBackground>
            </ScrollView>
        </SafeArea>
    )
    
}
import React, { useContext, useState } from 'react';
import { AuthenticationContext } from '../../../services/authentication/authentication.context';
import { Text,View, Button, Alert, TouchableOpacity,ScrollView } from "react-native";
import styled from 'styled-components';
import { StripeProvider, CardField, useConfirmPayment } from '@stripe/stripe-react-native';
import { handleStripePay } from '../../../services/restaurant/stripePay.services';
import { ActivityIndicator, Colors } from 'react-native-paper';

const Container = styled.View`
    flex:1;
    background-color:${(props) => props.theme.background};
`;

const PayText = styled.Text`
    color:${props=>props.theme.text}
    text-align:center
    margin-vertical:${props=>props.theme.space[4]}
    font-family:${props=>props.theme.fonts.body}
    font-size:${props=>props.theme.fontSizes.h5}
`;

const TextWrap=styled.Text`
    color:${props=>props.theme.text}
    margin-horizontal:${props=>props.theme.space[4]}
    margin-vertical:${props=>props.theme.space[1]}
    font-family:${props=>props.theme.fonts.heading}
    font-size:${props=>props.theme.fontSizes.body}
`;

const Pay=styled.TouchableOpacity`
  margin-top:50px;
  background-color:${props=>props.theme.colors.ui.basic}
  padding-vertical:14px
  padding-horizontal:30px
  margin-horizontal:120px
  border-radius:${props=>props.theme.space[2]}
`;

export const PaymentScreen = ({ route,navigation }) => {

  const { cost } = route.params
  var tempCost=cost+((cost*3.5)/100)
  const { user } = useContext(AuthenticationContext)
  const [ cardDetails,setCardDetails ] = useState()
  const [ stripe,setStripe ] = useState(false)
  const [ amount,setAmount ] = useState(cost)
  const { confirmPayment,loading } = useConfirmPayment()

  const handleStripe = () => {
    if(!cardDetails?.complete || !user.email)
    {
        Alert.alert("Please enter card details first!!")
        return
    }
    handleStripePay(confirmPayment,user.email,user.userName,amount)
  }

  return (
      <StripeProvider 
      publishableKey='pk_test_51M0GsnSAPvupGE4O3mgiMNJi70yYTwW5nS7VLVQHMePEzoFVOR8D7nNba8qgNf8g22vDamhmJ9pYXrEJYaCp0bup00qi1tqYzK'>
        <Container>
            <PayText>Pay for items</PayText>
            <TextWrap style={{fontSize:18}}>Amount to be paid: ₹{amount}</TextWrap>
            {stripe?
            (
              loading?
                (
                  <ActivityIndicator color={Colors.red400} size={50} style={{marginTop:50}}  />
                ):
                (
                  <ScrollView>
                    <View style={{marginTop:30}}>
                      <TextWrap>Type: </TextWrap>
                      <TextWrap style={{marginBottom:30}}>Credit/Debit Card</TextWrap>
                      <TextWrap>E-Mail:</TextWrap>
                      <TextWrap>{user.email}</TextWrap>
                      <TextWrap style={{marginTop:30}}>Enter credit/debit card information:</TextWrap>
                      <View style={{marginHorizontal:30}}>
                        <CardField
                          postalCodeEnabled={true}
                          placeholders={{
                            number:"4242 4242 4242 4242"
                          }}
                          onCardChange={(details) => {
                            setCardDetails(details);
                          }}
                          style={{height:50}}
                          cardStyle={{backgroundColor:"#cfcfcf",}}
                        />
                      </View>
                      <TextWrap style={{fontSize:12}}>*This may incur some extra cost</TextWrap>
                      <Pay onPress={()=>{{handleStripe()}}}>
                          <Text style={{color:"white",textAlign:"center"}}>Pay</Text>
                      </Pay>
                    </View>
                  </ScrollView>
                )
            ):
            (
              <>
                <View style={{flexDirection:"row"}}>
                  <View style={{flex:0.7}}>
                    <TextWrap style={{marginTop:50}}>Pay via Card</TextWrap>
                  </View>
                  <TouchableOpacity style={{flex:0.15,marginTop:50,backgroundColor:"rgb(56, 10, 100)",padding:8,borderRadius:8}} onPress={()=>{setStripe(true),setAmount(Math.floor(tempCost))}}>
                    <Text style={{color:"white",textAlign:"center"}}>Choose</Text>
                  </TouchableOpacity> 
                </View>
                <TextWrap style={{fontSize:12}}>*This may incur some extra cost</TextWrap>
              </>
            )
          }
        </Container>
      </StripeProvider>
    )
}
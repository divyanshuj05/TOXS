import React, { useContext, useState } from 'react';
import { AuthenticationContext } from '../../../services/authentication/authentication.context';
import { Text,View, Alert, TouchableOpacity,ScrollView } from "react-native";
import styled from 'styled-components';
import { StripeProvider, CardField, useConfirmPayment } from '@stripe/stripe-react-native';
import { handleStripePay } from '../../../services/restaurant/stripePay.services';
import { ActivityIndicator, Colors, TextInput, RadioButton } from 'react-native-paper';
import { RestaurantContext } from '../../../services/restaurant/restaurant-block.context';
import { RestaurantHistoryContext } from '../../../services/restaurant/orderHistory.context';
import { AppThemeContext } from '../../../services/common/theme.context';
import RazorpayCheckout from 'react-native-razorpay';

const Container = styled(View)`
    flex:1;
    background-color:${(props) => props.theme.background};
`;

const PayText = styled(Text)`
    color:${props=>props.theme.text}
    text-align:center
    margin-vertical:${props=>props.theme.space[4]}
    font-family:${props=>props.theme.fonts.body}
    font-size:${props=>props.theme.fontSizes.h5}
`;

const TextWrap=styled(Text)`
    color:${props=>props.theme.text}
    margin-horizontal:${props=>props.theme.space[4]}
    margin-vertical:${props=>props.theme.space[1]}
    font-family:${props=>props.theme.fonts.heading}
    font-size:${props=>props.theme.fontSizes.body}
`;

const Pay=styled(TouchableOpacity)`
  margin-top:50px;
  background-color:${props=>props.theme.colors.ui.basic}
  padding-vertical:12px
  padding-horizontal:28px
  border-radius:${props=>props.theme.space[4]}
  margin-bottom:16px;
  margin-horizontal:${props=>props.theme.space[4]}
`;

export const PaymentScreen = ({ route,navigation }) => {

  const { cost,data,restaurant,vendor } = route.params
  const { SearchHistory } = useContext(RestaurantHistoryContext) 
  const { scheme } = useContext(AppThemeContext)
  var tempCost=cost+((cost*3.5)/100)
  const { user } = useContext(AuthenticationContext)
  const [ cardDetails,setCardDetails ] = useState()
  const [ stripe,setStripe ] = useState(false)
  const [ razorPay,setRazorPay ]=useState(false)
  const [ amount,setAmount ] = useState(cost)
  const { SendOrder,isLoading } = useContext(RestaurantContext)
  const { confirmPayment,loading } = useConfirmPayment()
  const [addLocation,setAddLocation]=useState(false)
  const [location,setLocation]=useState("")
  const [type,setType]=useState("")
  const [paymentType,setPaymentType]=useState("N/A")

  const handleStripe = async() => {
    if(type=="")
    {
      alert("Fill order collection option")
      return false
    }
    if(addLocation==true)
    {
      if(location==""){
        alert("Location not filled")
        return false
      }
    }
    if(!cardDetails?.complete)
    {
        alert("Please enter card details first!!")
        return false
    }
    const res=await handleStripePay(confirmPayment,user.email,user.userName,amount)
    return res
  }

  const handleRazorPay = () => {
    if(type=="")
    {
      alert("Fill order collection option")
      return false
    }
    if(addLocation==true)
    {
      if(location==""){
        alert("Location not filled")
        return false
      }
    }
    var options = {
      description: 'Food orders payment',
      image: '../../../../assets/mainLogo.png',
      currency: 'INR',
      key: '',
      amount: amount*100,
      name: 'TOX',
      prefill: {
        email: user.email,
        contact: user.mobileNo,
        name: user.userName
      },
      theme: {color: scheme=="dark"?"white":"#191919"}
    }
    
    RazorpayCheckout.open(options).then((data) => {
      console.log(`Success: ${data.razorpay_payment_id}`);
      return data.razorpay_payment_id
    }).catch((error) => {
      console.log(error.code)
      alert("Some error occured! Please try again");
      return false
    });
  }

  return (
      <StripeProvider
      publishableKey='pk_test_51M0GsnSAPvupGE4O3mgiMNJi70yYTwW5nS7VLVQHMePEzoFVOR8D7nNba8qgNf8g22vDamhmJ9pYXrEJYaCp0bup00qi1tqYzK'>
        <Container>
            <PayText>Pay for items</PayText>
            <TextWrap style={{fontSize:18}}>Amount to be paid: ₹{amount}</TextWrap>
            <ScrollView keyboardShouldPersistTaps={'handled'}>
              <View style={{marginTop:30}}>
                <TextWrap>Payment Method: </TextWrap>
                <TextWrap style={{marginBottom:30}}>{paymentType}</TextWrap>
                <TextWrap>Mobile Number:</TextWrap>
                <TextWrap style={{marginBottom:30}}>{user.mobileNo}</TextWrap>
                <TextWrap>Choose how you want to collect your order:</TextWrap>
                <View style={{flexDirection:"row", alignItems:"center",marginLeft:32}}>
                  <RadioButton
                      status={ type === 'mySelf' ? 'checked' : 'unchecked' }
                      onPress={() => {setType('mySelf'),setAddLocation(false),setLocation("")}}
                      color="rgb(100, 50, 150)"
                      uncheckedColor={scheme=="dark"?"white":"#191919"}
                  />
                  <TextWrap style={{marginLeft:0}} onPress={() => {setType('mySelf'),setAddLocation(false),setLocation("")}}>I'll collect by myself</TextWrap> 
                </View>
                <View style={{flexDirection:"row", alignItems:"center",marginLeft:32}}>
                  <RadioButton
                      status={ type === 'Deliver' ? 'checked' : 'unchecked' }
                      onPress={() => {setType('Deliver'),setAddLocation(true)}}
                      color="rgb(100, 50, 150)"
                      uncheckedColor={scheme=="dark"?"white":"#191919"}
                  />
                  <TextWrap style={{marginLeft:0}} onPress={() => {setType('Deliver'),setAddLocation(true)}}>Deliver to my location</TextWrap> 
                </View>
                {addLocation?
                (
                  <>
                    <TextWrap style={{marginTop:15}}>Location:</TextWrap>
                    <TextInput
                      style={{marginHorizontal:30,height:50,marginBottom:15,backgroundColor:"#cfcfcf"}}
                      label="Your current location"
                      value={location}
                      textContentType="username"
                      keyboardType="default"
                      autoCapitalize="words"
                      onChangeText={(text) => { setLocation(text) }} />
                  </>
                ):
                (
                  <></>
                )
                }
              </View>
              {stripe?
              (
                loading||isLoading?
                  (
                    <ActivityIndicator color={Colors.red400} size={50} style={{marginTop:50}}  />
                  ):
                  (
                    <>
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
                      <View style={{flexDirection:"row"}}>
                        <View style={{flex:0.5}}>
                          <Pay activeOpacity={0.65} onPress={()=>{setStripe(false),setAmount(cost),setPaymentType("N/A")}}>
                            <Text style={{color:"white",textAlign:"center",fontSize:16}}>Close</Text>
                          </Pay>
                        </View>
                        <View style={{flex:0.5}}>
                          <Pay activeOpacity={0.65} onPress={async()=>{
                          const res=await handleStripe()
                          if(res==false){}
                          else
                          { 
                            await SendOrder(user.email,user.mobileNo,amount,vendor,data,restaurant,location,"stripe",res).then(res=>{
                              SearchHistory(user.email,user.type)
                              navigation.navigate("RestaurantsHome")
                            }).catch(e=>{
                              console.log(e)
                              alert("Some error occured")
                            })
                          }
                          }}>
                            <Text style={{color:"white",textAlign:"center",fontSize:16}}>Pay</Text>
                          </Pay>
                        </View>
                      </View>
                    </>
                  )
              ):
              (
                razorPay?
                (
                  isLoading?
                  (
                    <ActivityIndicator color={Colors.red400} size={50} style={{marginTop:50}}  />   
                  ):
                  (                  
                    <>
                      <View style={{flexDirection:"row"}}>
                          <View style={{flex:0.5}}>
                            <Pay activeOpacity={0.65} onPress={()=>{setRazorPay(false),setPaymentType("N/A")}}>
                              <Text style={{color:"white",textAlign:"center",fontSize:16}}>Close</Text>
                            </Pay>
                          </View>
                          <View style={{flex:0.5}}>
                            <Pay activeOpacity={0.65} onPress={async()=>{
                              const res=handleRazorPay()
                              if(res==false){}
                              else{
                                await SendOrder(user.email,user.mobileNo,amount,vendor,data,restaurant,location,"razorpay",res).then(res=>{
                                  SearchHistory(user.email,user.type)
                                  navigation.navigate("RestaurantsHome")
                                }).catch(e=>{
                                  console.log(e)
                                  alert("Some error occured")
                                })
                              }
                            }}>
                              <Text style={{color:"white",textAlign:"center",fontSize:16}}>Pay</Text>
                            </Pay>
                          </View>
                        </View>
                      </>
                  )
                ):
                (
                  <>
                    <View style={{flexDirection:"row"}}>
                      <View style={{flex:0.7}}>
                        <TextWrap style={{marginTop:50}}>Pay via Card</TextWrap>
                      </View>
                      <TouchableOpacity activeOpacity={0.65} style={{flex:0.15,marginTop:45,backgroundColor:"rgb(56, 10, 100)",padding:8,borderRadius:32}} onPress={()=>{setPaymentType("Credit/Debit Card"),setStripe(true),setAmount(Math.floor(tempCost))}}>
                        <Text style={{color:"white",textAlign:"center"}}>Choose</Text>
                      </TouchableOpacity> 
                    </View>
                    <TextWrap style={{fontSize:12}}>*This may incur some extra cost</TextWrap>
                    <View style={{flexDirection:"row",marginBottom:16}}>
                      <View style={{flex:0.7}}>
                        <TextWrap style={{marginTop:50}}>Razor Pay</TextWrap>
                      </View>
                      <TouchableOpacity activeOpacity={0.65} style={{flex:0.15,marginTop:45,backgroundColor:"rgb(56, 10, 100)",padding:8,borderRadius:32}} onPress={()=>{setRazorPay(true),setAmount(cost),setPaymentType("Razor Pay")}}>
                        <Text style={{color:"white",textAlign:"center"}}>Choose</Text>
                      </TouchableOpacity> 
                    </View>
                  </>
                )
              )
            }
          </ScrollView>
        </Container>
      </StripeProvider>
    )
}
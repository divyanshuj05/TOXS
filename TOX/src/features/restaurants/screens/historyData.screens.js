import React, { useContext, useState } from 'react'
import { ScrollView, Alert, View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native'
import { AuthenticationContext } from '../../../services/authentication/authentication.context';
import { RestaurantHistoryContext } from '../../../services/restaurant/orderHistory.context';
import styled from 'styled-components'
import { ActivityIndicator,Colors, TextInput } from 'react-native-paper';
import QRCode from "react-native-qrcode-svg"
import { DeviceOrientationContext } from "../../../services/common/deviceOrientation.context"
import { BarCodeScanner } from 'expo-barcode-scanner';
import { SafeArea } from '../../../utils/components/safe-area.components';

const Container = styled(View)`
    flex:1;
    background-color:${(props) => props.theme.background};
`;

const Head = styled(Text)`
    color:${props=>props.theme.text}
    text-align:center
    margin-vertical:${props=>props.theme.space[3]}
    font-family:${props=>props.theme.fonts.body}
    font-size:${props=>props.theme.fontSizes.h5}
`;

const SubHead = styled(Text)`
    color:${props=>props.theme.text}
    text-align:left
    margin-top:${props=>props.theme.space[2]}
    margin-bottom:${props=>props.theme.space[3]}
    margin-horizontal:${props=>props.theme.space[4]}
    font-family:${props=>props.theme.fonts.body}
    font-size:${props=>props.theme.fontSizes.title}
`;

const TextWrap = styled(Text)`
    color:${props=>props.theme.text}
    margin-left:${props=>props.theme.space[4]}
    margin-vertical:${props=>props.theme.space[2]}
    font-family:${props=>props.theme.fonts.heading}
    font-size:${props=>props.theme.fontSizes.body}
`;

const TouchBtn=styled(TouchableOpacity)`
    background-color:${props=>props.theme.colors.ui.basic}
    margin-horizontal:${props=>props.theme.space[4]}
    align-items:center
    padding:${props=>props.theme.space[2]}
    border-radius:${props=>props.theme.space[3]}
`;

const TextBtn=styled(Text)`
    color:white
    font-family:${props=>props.theme.fonts.heading}
    font-size:${props=>props.theme.fontSizes.body}
`;

const Row=styled(View)`
    flex-direction:row
`;

const BottomBar = styled(View)`
    background-color:${(props) => props.theme.colors.ui.basic};
    padding: ${(props) => props.theme.space[3]};
    border-radius: ${(props) => props.theme.space[4]};
    margin-horizontal: ${(props) => props.theme.space[2]};
    margin-horizontal: ${(props) => props.theme.space[2]};
    margin-bottom:${(props) => props.theme.space[2]};
`;

const Touch=styled(TouchableOpacity)`
    align-items:center
`;

const TextTouch=styled(Text)`
    color:white
    font-family:${props=>props.theme.fonts.heading}
    font-size:${props=>props.theme.fontSizes.body}
`;

const Veg=styled(View)`
    background-color:#007900;
    border-radius:128px;
    padding:4px;
`;

const NonVeg=styled(View)`
    background-color:#990000;
    border-radius:128px;
    padding:4px;
`;

export const OrderDetails = ({route,navigation}) => {

    const { item } = route.params
    const { user } = useContext(AuthenticationContext)
    const { OrderReady,isLoading } = useContext(RestaurantHistoryContext)
    const { orientation } = useContext(DeviceOrientationContext)
    const [addSecurity,setAddSecurity]=useState(false)
    const [security,setSecurity]=useState(null)
    const [scan,setScan]=useState(false)

    const handleOrderReady = (type,status) => {
        Alert.alert(
            "Sure?",
            `Order ${status}`,
            [

                {
                    text: "Yes",
                    onPress: () => { OrderReady(item.id,item.orderBy,navigation,type,status,user.userName) }
                },
                {
                    text: "No",
                    onPress: () => { <></> }
                }
            ]
        )
    }

    const handleQRCodeScan = async() => {
        const { status } = await BarCodeScanner.requestPermissionsAsync()
        if(status!=="granted")
        {
            alert("Permission not granted to use scanner!")
            return false
        }
        setScan(true)
        return true
    }

    const handleManualScan = (key) => {
        if(security==null||security==""){
            setAddSecurity(false)
            return
        }
        if(security==key)
        {   
            setAddSecurity(false)
            setSecurity(null)
            OrderReady(item.id,item.orderBy,navigation,user.type,"Delivered",user.userName)
        }
        else{
            alert("Invalid Key!")
        }
    }

    const handleBarCodeScanned = ({ type,data }) => {
        setScan(false)
        if(data==item.key)
        {
            OrderReady(item.id,item.orderBy,navigation,type,"Delivered",user.userName)
        }
        else{
            alert("Invalid Key!")
        }
    }

    if(isLoading)
    {
        return(
            <Container>
                <ActivityIndicator color={Colors.red400} size={50} style={{marginTop:50}}  />
            </Container>
        )
    }

    const Render = () => {
        return(
            <>
            {scan?(
                <>
                    <BarCodeScanner style={{width:"100%",height:"91%"}} onBarCodeScanned={!scan ? undefined : handleBarCodeScanned} />
                    <Button color="rgb(56, 10, 100)" title="Close" onPress={()=>setScan(false)} />
                </>
            ):(<></>)}
            <Container>
                <Head>{item.restaurant} Order</Head>
                <ScrollView contentContainerStyle={{flexGrow:1}} keyboardShouldPersistTaps={'handled'}>
                    <SubHead>Order Details:</SubHead>
                    {item.location==""?
                    (
                        <TextWrap style={{fontWeight:"bold"}}>Customer will collect the order</TextWrap>
                    ):
                    (
                        <TextWrap style={{fontWeight:"bold"}}>Order to be delivered to the customer</TextWrap>
                    )
                    }
                    <Row>
                        <View style={{flex:0.4}}>
                            <TextWrap>Amount</TextWrap>
                        </View>
                        <View style={{flex:0.6}}>
                            <TextWrap>₹{item.amount}</TextWrap>
                        </View>
                    </Row>
                    <Row>
                        <View style={{flex:0.4}}>
                            <TextWrap>Status</TextWrap>
                        </View>
                        <View style={{flex:0.6}}>
                            <TextWrap>{item.status}</TextWrap>
                        </View>
                    </Row>
                    {user.type=="users"?
                    (
                        <Row>
                            <View style={{flex:0.4}}>
                                <TextWrap>Vendor Mobile</TextWrap>
                            </View>
                            <View style={{flex:0.6}}>
                                <TextWrap>{item.vendorMobile}</TextWrap>
                            </View>
                        </Row>
                    ):
                    (
                        <Row>
                            <View style={{flex:0.4}}>
                                <TextWrap>Customer Mobile</TextWrap>
                            </View>
                            <View style={{flex:0.6}}>
                                <TextWrap>{item.userMobile}</TextWrap>
                            </View>
                        </Row>
                    )
                    }
                    {item.location==""?
                    (
                        <></>
                    ):
                    (
                        <Row>
                            <View style={{flex:0.4}}>
                                <TextWrap>Delivery location</TextWrap>
                            </View>
                            <View style={{flex:0.6}}>
                                <TextWrap>{item.location}</TextWrap>
                            </View>
                        </Row>
                    )
                    }
                    <Row>
                        <View style={{flex:0.4}}>
                            <TextWrap>Order Date</TextWrap>
                        </View>
                        <View style={{flex:0.6}}>
                            <TextWrap>{item.orderDate}</TextWrap>
                        </View>
                    </Row>
                    <Row>
                        <View style={{flex:0.4}}>
                            <TextWrap>Order Time</TextWrap>
                        </View>
                        <View style={{flex:0.6}}>
                            <TextWrap>{item.orderTime}</TextWrap>
                        </View>
                    </Row>
                    {user.type=="users"?
                    (
                        <>
                            <Row>
                                <View style={{flex:0.4}}>
                                    <TextWrap>Security Key</TextWrap>
                                </View>
                                <View style={{flex:0.6}}>
                                    <TextWrap>{item.key}</TextWrap>
                                </View>
                            </Row>
                            <Row>
                                <View style={{flex:0.4}}>
                                    <TextWrap>QR Code</TextWrap>
                                </View>
                                <View style={{flex:orientation==1||orientation==2?0.25:0.12,borderRadius:8,alignItems:"center", marginLeft:48, backgroundColor:"rgb(150,150,150)",paddingVertical:4}}>
                                    <QRCode size={75} onError={(e)=>console.log(e)} color='black' backgroundColor='white' value={item.key} />
                                </View>
                            </Row>
                        </>
                    ):
                    (
                        item.status=="Delivered"?
                        (
                            <></>
                        ):
                        (
                            <View style={{flexDirection:"row",marginVertical:16}}>
                                {addSecurity?
                                (
                                    <>
                                        <TextInput 
                                            placeholder='Enter security key'
                                            style={{flex:0.8,height:30,marginLeft:32}}
                                            value={security}
                                            keyboardType="numeric"
                                            onChangeText={(text)=>setSecurity(text)}
                                        />
                                        <TouchBtn activeOpacity={0.65} style={{flex:0.2}} onPress={()=>handleManualScan(item.key)}>
                                            <TextBtn>Done</TextBtn>
                                        </TouchBtn>
                                    </>
                                ):
                                (
                                    <>
                                        <TouchBtn activeOpacity={0.65} style={{flex:0.5}} onPress={handleQRCodeScan}>
                                            <TextBtn>Scan QR</TextBtn>
                                        </TouchBtn>
                                        <TouchBtn activeOpacity={0.65}style={{flex:0.5}} onPress={()=>setAddSecurity(true)}>
                                            <TextBtn>QR not working</TextBtn>
                                        </TouchBtn>
                                    </>
                                )
                                }
                            </View>
                        )
                    )
                    }
                    <View style={{marginVertical:8}}></View>
                    <TextWrap>Order:</TextWrap>
                    {item.order.map(item=>{
                        const key=item.title
                        return(
                            <Row key={key}>
                                <View style={{marginLeft:16,justifyContent:"center"}}>
                                {item.type=="Veg"?
                                    (
                                        <Veg></Veg>
                                    ):
                                    (
                                        <NonVeg></NonVeg>
                                    )
                                    }
                                </View>
                                <View style={{flex:0.4}}>
                                    <TextWrap>{item.title}</TextWrap>
                                </View>
                                <View style={{flex:0.2}}>
                                    <TextWrap>x{item.count}</TextWrap>
                                </View>
                                <View style={{flex:0.3}}>
                                    <TextWrap>₹{item.price}</TextWrap>
                                </View>
                            </Row>            
                        )
                    })}
                </ScrollView>
                {user.type=="vendors"?
                (
                    item.status=="Not Ready"?
                    (
                        <BottomBar>
                        <Touch activeOpacity={0.65} onPress={()=>handleOrderReady(user.type,"Ready")}>
                            <TextTouch>Order ready?</TextTouch>
                        </Touch>
                        </BottomBar>
                    ):
                    (
                        <></>
                    )
                ):
                (
                    <></>
                )
                }
            </Container>
            </>
        )
    }

    if(user.type=="delivery")
    {
        return(
            <SafeArea>
                {Render()}
            </SafeArea>
        )
    }else{
        return(
            Render()
        )
    }
}
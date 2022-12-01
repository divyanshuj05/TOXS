import React, { useContext } from 'react'
import { ScrollView, Alert, View, Text, TouchableOpacity } from 'react-native'
import { AuthenticationContext } from '../../../services/authentication/authentication.context';
import { RestaurantHistoryContext } from '../../../services/restaurant/orderHistory.context';
import styled from 'styled-components'
import { ActivityIndicator,Colors } from 'react-native-paper';

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
    margin-bottom:${props=>props.theme.space[4]}
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
    
    return(
        <Container>
            <Head>{item.restaurant} Order</Head>
            <ScrollView contentContainerStyle={{flexGrow:1}}>
                <SubHead>Order Details:</SubHead>
                <Row>
                    <View style={{flex:0.3}}>
                        <TextWrap>Amount</TextWrap>
                    </View>
                    <View style={{flex:0.6}}>
                        <TextWrap>₹{item.amount}</TextWrap>
                    </View>
                </Row>
                <Row>
                    <View style={{flex:0.3}}>
                        <TextWrap>Status</TextWrap>
                    </View>
                    <View style={{flex:0.6}}>
                        <TextWrap>{item.status}</TextWrap>
                    </View>
                </Row>
                <Row>
                    <View style={{flex:0.3}}>
                        <TextWrap>Customer</TextWrap>
                    </View>
                    <View style={{flex:0.6}}>
                        <TextWrap>{item.orderBy}</TextWrap>
                    </View>
                </Row>
                <Row>
                    <View style={{flex:0.3}}>
                        <TextWrap>Order Date</TextWrap>
                    </View>
                    <View style={{flex:0.6}}>
                        <TextWrap>{item.orderDate}</TextWrap>
                    </View>
                </Row>
                <Row>
                    <View style={{flex:0.3}}>
                        <TextWrap>Order Time</TextWrap>
                    </View>
                    <View style={{flex:0.6}}>
                        <TextWrap>{item.orderTime}</TextWrap>
                    </View>
                </Row>
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
                    {isLoading?
                    (
                        <View style={{flex:1}}>
                            <ActivityIndicator size={20} color={Colors.blue300} />
                        </View>
                    ):
                    (
                        <Touch activeOpacity={0.65} onPress={()=>handleOrderReady(user.type,"Ready")}>
                            <TextTouch>Order ready?</TextTouch>
                        </Touch>
                    )
                    }
                    </BottomBar>
                ):
                (
                    <></>
                )
            ):
            (
                item.status=="Ready"?
                (
                    <BottomBar>
                    {isLoading?
                    (
                        <View style={{flex:1}}>
                            <ActivityIndicator size={20} color={Colors.blue300} />
                        </View>
                    ):
                    (
                        <Touch activeOpacity={0.65} onPress={()=>handleOrderReady(user.type,"Delivered")}>
                            <TextTouch>Order taken?</TextTouch>
                        </Touch>
                    )
                    }
                    </BottomBar>
                ):
                (
                    <></>
                )
            )
            }
        </Container>
    )
}
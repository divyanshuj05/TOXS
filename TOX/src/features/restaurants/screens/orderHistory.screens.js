import React,{ useContext, useEffect } from 'react'
import { FlatList, TouchableOpacity, View } from 'react-native';
import { AuthenticationContext } from '../../../services/authentication/authentication.context';
import { RestaurantHistoryContext } from '../../../services/restaurant/orderHistory.context'
import styled from 'styled-components'
import { ActivityIndicator,Colors } from 'react-native-paper';
var randomstring=require("randomstring")

const Container = styled.View`
    flex:1;
    background-color:${(props) => props.theme.background};
`;

const Head = styled.Text`
    color:${props=>props.theme.text}
    text-align:center
    margin-vertical:${props=>props.theme.space[3]}
    font-family:${props=>props.theme.fonts.body}
    font-size:${props=>props.theme.fontSizes.h5}
`;

const Wrapper=styled.View`
    background-color:${props => props.theme.colors.brand.basic};
    padding:${props=>props.theme.space[4]}
    margin-vertical:${props=>props.theme.space[2]}
    margin-horizontal:${props=>props.theme.space[3]}
    flex-direction:row
`;

const TextWrap = styled.Text`
    color:black
    font-family:${props=>props.theme.fonts.heading}
    font-size:${props=>props.theme.fontSizes.body}
`;

const Empty=styled.Text`
    color: ${props=>props.theme.text}
    text-align:center
    font-size:${props=>props.theme.fontSizes.title}
    padding-top:${props=>props.theme.space[6]}
    font-family:${props=>props.theme.fonts.body}
`;

export const OrderHistory = ({ navigation }) => {

    const { history, isLoading, Search } = useContext(RestaurantHistoryContext)
    const { user } = useContext(AuthenticationContext) 

    useEffect(()=>{
        if(user.type=="users")
        {
            Search(user.email,user.type)
        }else{
            Search(user.userName,user.type)
        }
    },[])

    const renderItem = (item) => {
        return(
            <TouchableOpacity onPress={()=>navigation.navigate("OrderDetail",{item:item.item})}>
                <Wrapper>
                    <View style={{flex:0.5}}>
                        <TextWrap>{item.item.restaurant} order</TextWrap>
                    </View>
                    <View style={{flex:0.2}}>
                        <TextWrap>₹{item.item.amount}</TextWrap>
                    </View>
                    <View style={{flex:0.3}}>
                        <TextWrap>{item.item.status}</TextWrap>
                    </View>
                </Wrapper>
            </TouchableOpacity>
        )
    }

    return(
        <Container>
            <Head>My History</Head>
            {isLoading?
            (
                <ActivityIndicator color={Colors.red400} size={50} style={{marginTop:50}} />
            ):
            (
                history? 
                (   
                    <FlatList 
                        data={history} 
                        renderItem={renderItem}
                        keyExtractor={(item)=>randomstring.generate()}
                    />
                ):(
                    <Empty>No items found!!</Empty>
                )
            )
            }
        </Container>
    )
}
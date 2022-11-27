import React, { useContext } from 'react';
import { View, TouchableOpacity, Text, FlatList } from "react-native"
import { CartContext } from '../../../services/restaurant/cart.context';
import styled from 'styled-components';
import { DeviceOrientationContext } from '../../../services/common/deviceOrientation.context';

const Container = styled(View)`
    flex:1;
    background-color:${(props) => props.theme.background};
`;

const MainText = styled(Text)`
    margin-top:${(props) => props.theme.space[2]};
    text-align:center;
    color:${(props) => props.theme.text};
    font-size: ${(props) => props.theme.fontSizes.h5};
    font-weight: ${(props) => props.theme.fontWeights.medium};
    font-family:${(props) => props.theme.fonts.body};
    padding-bottom:${(props) => props.theme.space[3]};
`;

const FlatListStyle = styled(FlatList)`
    flex:0.87
`;

const ListText = styled(Text)`
    font-size: ${(props) => props.theme.fontSizes.body};
    padding-bottom:${(props) => props.theme.space[4]};
    font-family:${(props) => props.theme.fonts.heading};
    color:${(props) => props.theme.text};
`;

const ViewFlex = styled(View)`
    flex-direction:row;
    padding-left:${(props) => props.theme.space[4]};
`;

const TotalText = styled(Text)`
    color:${(props) => props.theme.text};
    font-size: 18px;
    font-family:${(props) => props.theme.fonts.heading};
    font-weight:${(props) => props.theme.fontWeights.bold};
`;

const Total = styled(View)`
    flex-direction:row;
    flex:0.15
    padding-left:${(props) => props.theme.space[4]};
`;

const CancelLand = styled(Text)`
    text-align:center;
    font-size: 18px;
    padding:8px;
    font-family:${(props) => props.theme.fonts.heading};
    font-weight:${(props) => props.theme.fontWeights.bold};
    color:${(props) => props.theme.colors.bg.primary};
    background-color:${(props) => props.theme.colors.ui.error};
    border-top-left-radius:32px
    border-bottom-left-radius:32px
    margin-bottom:${(props) => props.theme.space[1]};
`;

const PayLand = styled(Text)`
    text-align:center;
    font-size: 18px;
    padding:8px;
    font-family:${(props) => props.theme.fonts.heading};
    font-weight:${(props) => props.theme.fontWeights.bold};
    color:${(props) => props.theme.colors.bg.primary};
    background-color:${(props) => props.theme.colors.ui.success};
    border-top-right-radius:32px
    border-bottom-right-radius:32px
    margin-bottom:${(props) => props.theme.space[1]};
`;

export const OrderListScreen = ({ navigation,route }) => {

    const { cost, items, order, unique, costItem } = useContext(CartContext)
    const { orientation } = useContext(DeviceOrientationContext)
    const { restaurant, vendor } = route.params

    var data = []

    const cal = () => {
        let count = 0
        for (let i = 0; i < unique.length; i++) {
            var name = unique[i];
            var rate = costItem[i];
            for (let j = 0; j < order.length; j++) {
                if (unique[i] === order[j]) {
                    count = count + 1
                }
            }
            if (count != 0) {
                const temp = { "Name": name, "Count": count, "Price": rate * count }
                data.push(temp)
            }
            count = 0
        }
    }
    
    const renderItem = ({ item }) => {
        return (
            <ViewFlex>
                <View style={{ flex: 0.5 }}>
                    <ListText>{item.Name}</ListText>
                </View>
                <View style={{ flex: 0.2 }}>
                    <ListText>x {item.Count}</ListText>
                </View>
                <View style={{ flex: 0.3 }}>
                    <ListText>₹{item.Price}</ListText>
                </View>
            </ViewFlex>
        )
    };

    return (
        <Container>
            <MainText>Your Order List</MainText>
            {cal()}
            <ViewFlex>
                <View style={{ flex: 0.5 }}>
                    <ListText>Name of item</ListText>
                </View>
                <View style={{ flex: 0.2 }}>
                    <ListText>No of Items</ListText>
                </View>
                <View style={{ flex: 0.3 }}>
                    <ListText>Price</ListText>
                </View>
            </ViewFlex>
            <FlatListStyle
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.Name}
            />
            <Total>
                <View style={{ flex: 0.5 }}>
                    <TotalText>TOTAL</TotalText>
                </View>
                <View style={{ flex: 0.2 }}>
                    <TotalText>   {items}</TotalText>
                </View>
                <View style={{ flex: 0.3 }}>
                    <TotalText>₹{cost}</TotalText>
                </View>
            </Total>
            {
                orientation==1||orientation==2?
                (
                    <View style={{flexDirection: "row" }}>
                        <TouchableOpacity activeOpacity={0.65} style={{ flex: 0.5, justifyContent: 'center' }} onPress={() => { navigation.goBack() }}>
                            <CancelLand>Go Back</CancelLand>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.65} style={{ flex: 0.5, justifyContent: 'center' }} onPress={() => { navigation.navigate("Payments",{cost:cost,data:data,restaurant:restaurant,vendor:vendor}) }}>
                            <PayLand>Pay amount</PayLand>
                        </TouchableOpacity>
                    </View>
                ):
                (
                    <View style={{flexDirection: "row" }}>
                        <TouchableOpacity activeOpacity={0.65} style={{ flex: 0.5, justifyContent: 'center' }} onPress={() => { navigation.goBack() }}>
                            <CancelLand>Go Back</CancelLand>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.65} style={{ flex: 0.5, justifyContent: 'center' }} onPress={() => { navigation.navigate("Payments",{cost:cost,data:data,restaurant:restaurant,vendor:vendor}) }}>
                            <PayLand>Pay amount</PayLand>
                        </TouchableOpacity>
                    </View>
                )
            }
            
        </Container>
    )
}
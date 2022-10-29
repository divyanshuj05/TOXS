import React, { useContext } from 'react';
import { View, TouchableOpacity, ScrollView } from "react-native"
import { CartContext } from '../../../services/restaurant/cart.context';
import styled from 'styled-components';
import { DeviceOrientationContext } from '../../../services/common/deviceOrientation.context';

const Container = styled.View`
    flex:1;
    background-color:${(props) => props.theme.background};
`;

const MainText = styled.Text`
    margin-top:${(props) => props.theme.space[2]};
    text-align:center;
    color:${(props) => props.theme.text};
    font-size: ${(props) => props.theme.fontSizes.h5};
    font-weight: ${(props) => props.theme.fontWeights.medium};
    font-family:${(props) => props.theme.fonts.body};
    padding-bottom:${(props) => props.theme.space[3]};
`;

const FlatListStyle = styled.FlatList`
    flex:0.87
`;

const ListText = styled.Text`
    font-size: ${(props) => props.theme.fontSizes.body};
    padding-bottom:${(props) => props.theme.space[4]};
    font-family:${(props) => props.theme.fonts.heading};
    color:${(props) => props.theme.text};
`;

const ViewFlex = styled.View`
    flex-direction:row;
    padding-left:${(props) => props.theme.space[4]};
`;

const TotalText = styled.Text`
    color:${(props) => props.theme.text};
    font-size: 18px;
    font-family:${(props) => props.theme.fonts.heading};
    font-weight:${(props) => props.theme.fontWeights.bold};
`;

const Total = styled.View`
    flex-direction:row;
    flex:0.15
    padding-left:${(props) => props.theme.space[4]};
`;

const Cancel = styled.Text`
    text-align:center;
    font-size: 18px;
    padding:20px;
    font-family:${(props) => props.theme.fonts.heading};
    font-weight:${(props) => props.theme.fontWeights.bold};
    color:${(props) => props.theme.colors.bg.primary};
    background-color:${(props) => props.theme.colors.ui.error};
`;

const Pay = styled.Text`
    text-align:center;
    font-size: 18px;
    padding:20px;
    font-family:${(props) => props.theme.fonts.heading};
    font-weight:${(props) => props.theme.fontWeights.bold};
    color:${(props) => props.theme.colors.bg.primary};
    background-color:${(props) => props.theme.colors.ui.success};
`;

const CancelLand = styled.Text`
    text-align:center;
    font-size: 18px;
    padding:8px;
    font-family:${(props) => props.theme.fonts.heading};
    font-weight:${(props) => props.theme.fontWeights.bold};
    color:${(props) => props.theme.colors.bg.primary};
    background-color:${(props) => props.theme.colors.ui.error};
`;

const PayLand = styled.Text`
    text-align:center;
    font-size: 18px;
    padding:8px;
    font-family:${(props) => props.theme.fonts.heading};
    font-weight:${(props) => props.theme.fontWeights.bold};
    color:${(props) => props.theme.colors.bg.primary};
    background-color:${(props) => props.theme.colors.ui.success};
`;

export const OrderListScreen = ({ navigation }) => {

    const { cost, items, order, unique, costItem } = useContext(CartContext)
    const { orientation } = useContext(DeviceOrientationContext)

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
                        <TouchableOpacity style={{ flex: 0.5, justifyContent: 'center' }} onPress={() => { navigation.goBack() }}>
                            <Cancel>Go Back</Cancel>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ flex: 0.5, justifyContent: 'center' }} onPress={() => { navigation.navigate("Payments") }}>
                            <Pay>Pay amount</Pay>
                        </TouchableOpacity>
                    </View>
                ):
                (
                    <View style={{flexDirection: "row" }}>
                        <TouchableOpacity style={{ flex: 0.5, justifyContent: 'center' }} onPress={() => { navigation.goBack() }}>
                            <CancelLand>Go Back</CancelLand>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ flex: 0.5, justifyContent: 'center' }} onPress={() => { navigation.navigate("Payments") }}>
                            <PayLand>Pay amount</PayLand>
                        </TouchableOpacity>
                    </View>
                )
            }
            
        </Container>
    )
}
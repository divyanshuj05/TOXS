import React, { useContext } from 'react';
import { Text, FlatList, View, TouchableOpacity } from "react-native";
import styled from 'styled-components';
import { AddFoodItems } from './add-food.components';
import { CartContext } from '../../../services/restaurant/cart.context';
import { AntDesign } from '@expo/vector-icons';

const FlatListStyle = styled(FlatList)`
    padding-top:${(props) => props.theme.space[3]};
    padding-left:${(props) => props.theme.space[1]};
    padding-right:${(props) => props.theme.space[1]};
`;

const ListView = styled(View)`
    font-family:${(props) => props.theme.fonts.body};
    font-size: ${(props) => props.theme.fontSizes.body};
    padding-vertical:${(props) => props.theme.space[3]};
    margin-bottom:${(props) => props.theme.space[2]};
`;

const ListTitle = styled(Text)`
    padding-left:${(props) => props.theme.space[3]};
    padding-right:${(props) => props.theme.space[6]};
    font-family:${(props) => props.theme.fonts.heading};
`;

const ListPrice = styled(Text)`
    padding-horizontal:${(props) => props.theme.space[3]};
    font-family:${(props) => props.theme.fonts.heading};
    padding-top:${(props) => props.theme.space[2]};
`;

const BottomBar = styled(View)`
    background-color:rgb(56, 10, 100);
    flex-direction:row
    padding: ${(props) => props.theme.space[3]};
    border-radius: ${(props) => props.theme.space[2]};
    margin-horizontal: ${(props) => props.theme.space[2]};
`;

const ItemText = styled(Text)`
    color:${(props) => props.theme.colors.bg.primary};
    font-size: ${(props) => props.theme.fontSizes.body};
    font-family:${(props) => props.theme.fonts.heading};
`;

const CostText = styled(Text)`
    color:${(props) => props.theme.colors.bg.primary};
    font-size: ${(props) => props.theme.fontSizes.body};
    font-family:${(props) => props.theme.fonts.heading};
    margin-left: 32px;
`;

const Proceed = styled(Text)`
    color:${(props) => props.theme.colors.bg.primary};
    font-size: ${(props) => props.theme.fontSizes.body};
    font-family:${(props) => props.theme.fonts.heading};
    margin-left: 64px;
`;

export const MenuList = ({ data, navigation }) => {

    const { items, cost } = useContext(CartContext)

    const renderItem = ({ item }) => {
        return (
            <ListView>
                <ListTitle>
                    {item.title}
                </ListTitle>
                <View style={{ flexDirection: 'row' }}>
                    <ListPrice>
                        ₹{item.price}
                    </ListPrice>
                    <AddFoodItems foodDetail={item} />
                </View>
            </ListView>
        );
    };

    return (
        <>
            <FlatListStyle
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.title}
            />
            <BottomBar>
                <ItemText>Items {items}</ItemText>
                <CostText>Cost {cost}</CostText>
                <TouchableOpacity style={{ flexDirection: "row" }} onPress={() => navigation.navigate("Payments")}>
                    <Proceed>Proceed to pay</Proceed>
                    <AntDesign style={{ marginLeft: 1 }} name="arrowright" size={19} color="white" />
                </TouchableOpacity>
            </BottomBar>
        </>
    )
}
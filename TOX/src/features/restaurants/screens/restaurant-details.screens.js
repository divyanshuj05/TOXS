import React, { useEffect, useContext } from "react";
import { Alert } from "react-native";
import { SafeArea } from "../../../utils/components/safe-area.components";
import styled from 'styled-components';
import { MenuList } from "../components/menu-list.components";
import { CartContext } from "../../../services/restaurant/cart.context";

const RestaurantText = styled.Text`
    margin-top:${(props) => props.theme.space[2]};
    text-align:center;
    color:${(props) => props.theme.colors.text.primary};
    font-size: ${(props) => props.theme.fontSizes.h5};
    font-weight: ${(props) => props.theme.fontWeights.medium};
    font-family:${(props) => props.theme.fonts.body};
`;

export const RestaurantDetails = ({ route, navigation }) => {

    const { restaurent } = route.params;

    const { destroy, items } = useContext(CartContext)

    useEffect(() => {
        navigation.addListener('beforeRemove', (block) => {
            block.preventDefault();
            Alert.alert(
                "Discard cart?",
                "Any changes will be discarded",
                [
                    {
                        text: "Yes",
                        onPress: () => { navigation.dispatch(block.data.action), destroy() }
                    },
                    {
                        text: "No",
                        onPress: () => { <></> }
                    }
                ]
            )

        })
    }, [navigation])

    const flatlistData = [
        {
            title: "Veg Wrap",
            price: 20,
            notAdded: true
        },
        {
            title: "Burger",
            price: 25,
            notAdded: true
        },
        {
            title: "Cold Drink",
            price: 10,
            notAdded: true
        },
        {
            title: "Chips",
            price: 10,
            notAdded: true
        },
        {
            title: "Pizza",
            price: 80,
            notAdded: true
        },
        {
            title: "Patties",
            price: 25,
            notAdded: true
        },
        {
            title: "Sandwich",
            price: 30,
            notAdded: true
        },
    ];

    return (
        <SafeArea>
            <RestaurantText>{restaurent}</RestaurantText>
            <MenuList data={flatlistData} navigation={navigation} />
        </SafeArea>
    );
}

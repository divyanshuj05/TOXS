import React from 'react';
import { Text, FlatList, View } from "react-native";
import styled from 'styled-components';
import { AddFoodItems } from './add-food.components';

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

export const MenuList = ({ data }) => {

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
        <FlatListStyle
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.title}
        />
    )
}
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
    padding-left:${(props) => props.theme.space[2]};
    padding-right:${(props) => props.theme.space[6]};
    font-family:${(props) => props.theme.fonts.heading};
    color:${(props) => props.theme.text};
`;

const ListPrice = styled(Text)`
    padding-horizontal:${(props) => props.theme.space[2]};
    font-family:${(props) => props.theme.fonts.heading};
    padding-top:${(props) => props.theme.space[2]};
    color:${(props) => props.theme.text};
`;

const BottomBar = styled(View)`
    background-color:${(props) => props.theme.colors.ui.basic};
    flex-direction:row
    padding: ${(props) => props.theme.space[3]};
    border-radius: ${(props) => props.theme.space[4]};
    margin-horizontal: ${(props) => props.theme.space[2]};
    margin-bottom:${(props) => props.theme.space[2]};
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

export const MenuList = ({ data, navigation, restaurant, vendor, type }) => {

    const { items, cost } = useContext(CartContext)

    const renderItem = ({ item }) => {
        if(type=="Veg Only")
        {
            return(
                item.type=="Veg"?
                (
                    <View style={{flexDirection:"row",justifyContent:"center"}}>  
                        <View style={{marginLeft:8,justifyContent:"center"}}>
                            <Veg></Veg>
                        </View>
                        <View style={{alignItems:"center"}}>
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
                        </View>
                    </View>
                ):
                (<></>
                )
            )
        }
        return (
            <View style={{flexDirection:"row",justifyContent:"center"}}>  
                <View style={{marginLeft:8,justifyContent:"center"}}>
                    {item.type=="Veg"?
                    (
                        <Veg></Veg>
                    ):
                    (
                        <NonVeg></NonVeg>
                    )
                    }
                </View>
                <View style={{alignItems:"center"}}>
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
                </View>
            </View>
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
                <View style={{flex:0.6,flexDirection:'row'}}>
                    <ItemText>Items {items}</ItemText>
                    <CostText>Cost {cost}</CostText>
                </View>
                {items === 0 ?
                    (
                        <></>
                    ) :
                    (
                        <TouchableOpacity activeOpacity={0.65} style={{ flex: 0.4, flexDirection:"row" }} onPress={() => navigation.navigate("OrderList",{restaurant:restaurant,vendor:vendor})}>
                            <Proceed>Proceed to pay</Proceed>
                            <AntDesign style={{ marginLeft: 1 }} name="arrowright" size={19} color="white" />
                        </TouchableOpacity>
                    )
                }
            </BottomBar>
        </>
    )
}
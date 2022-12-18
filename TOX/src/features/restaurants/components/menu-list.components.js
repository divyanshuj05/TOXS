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
    align-items:center;
`;

const ListTitle = styled(Text)`
    font-family:${(props) => props.theme.fonts.heading};
    color:${(props) => props.theme.text};
    font-size:14px;
    margin-left:5px;
`;

const ListPrice = styled(Text)`
    font-family:${(props) => props.theme.fonts.heading};
    color:${(props) => props.theme.text};
    font-size:14px;
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
                item.type=="Veg"&&item.isPresent===true?
                (
                    <>
                        <View style={{flexDirection:"row",marginBottom:0,justifyContent:"center"}}>  
                        <View style={{justifyContent:"center"}}>
                            <Veg></Veg>
                        </View>
                        <View style={{flex:0.5,justifyContent:"center"}}>
                            <ListTitle>
                                {item.title}
                            </ListTitle>
                        </View>
                        <View style={{flex:0.3}}>
                            <AddFoodItems foodDetail={item} />
                        </View>
                        </View>
                        <View style={{flexDirection:"row",marginBottom:30,justifyContent:"center"}}>
                            <View style={{flex:0.8}}>
                                <ListPrice>
                                    ₹{item.price}
                                </ListPrice>
                            </View>
                        </View>
                    </>
                ):
                (<></>
                )
            )
        }
        return (
            item.isPresent===true?
            (
                <>
                    <View style={{flexDirection:"row",marginBottom:0,justifyContent:"center"}}>  
                        <View style={{justifyContent:"center"}}>
                            {item.type=="Veg"?
                            (
                                <Veg></Veg>
                            ):
                            (
                                <NonVeg></NonVeg>
                            )
                            }
                        </View>
                        <View style={{flex:0.5,justifyContent:"center"}}>
                            <ListTitle>
                                {item.title}
                            </ListTitle>
                        </View>
                        <View style={{flex:0.3}}>
                            <AddFoodItems foodDetail={item} />
                        </View>
                    </View>
                    <View style={{flexDirection:"row",marginBottom:30,justifyContent:"center"}}>
                        <View style={{flex:0.8}}>
                            <ListPrice>
                                ₹{item.price}
                            </ListPrice>
                        </View>
                    </View>
                </>
            ):
            (
                <></>
            )
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
                    <ItemText>Items: {items}</ItemText>
                    <CostText>Total: ₹{cost}</CostText>
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
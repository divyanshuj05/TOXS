import React from "react";
import { Text, FlatList, View, TouchableOpacity } from "react-native";
import { SafeArea } from "../../../utils/components/safe-area.components";
import styled from 'styled-components';

const RestaurantText = styled.Text`
    margin-top:${(props) => props.theme.space[2]};
    text-align:center;
    color:${(props) => props.theme.colors.text.primary};
    font-size: ${(props) => props.theme.fontSizes.h5};
    font-weight: ${(props) => props.theme.fontWeights.medium};
    font-family:${(props) => props.theme.fonts.body};
`;

const FlatListStyle=styled(FlatList)`
    padding-top:${(props)=>props.theme.space[3]};
    padding-left:${(props)=>props.theme.space[1]};
    padding-right:${(props)=>props.theme.space[1]};
`;

const ListView=styled(View)`
    font-family:${(props) => props.theme.fonts.body};
    font-size: ${(props) => props.theme.fontSizes.body};
    padding-vertical:${(props)=>props.theme.space[3]};
    margin-bottom:${(props)=>props.theme.space[2]};
`;

const ListTitle=styled(Text)`
    padding-left:${(props)=>props.theme.space[3]};
    padding-right:${(props)=>props.theme.space[6]};
    font-family:${(props) => props.theme.fonts.heading};
`;

const ListPrice=styled(Text)`
    padding-horizontal:${(props)=>props.theme.space[3]};
    font-family:${(props) => props.theme.fonts.heading};
`;

const AddButton=styled(TouchableOpacity)`

`;

export const RestaurantDetails = ({ route }) => {
  const { restaurent } = route.params;

  const flatlistData = [
    {
      title: "Veg Wrap",
      price: "20",
    },
    {
      title: "Burger",
      price: "25",
    },
    {
      title: "Cold Drink",
      price: "10",
    },
    {
      title: "Chips",
      price: "10",
    },
    {
      title: "Pizza",
      price: "80",
    },
    {
      title: "Patties",
      price: "25",
    },
    {
      title: "Sandwich",
      price: "30",
    },
  ];

  const renderItem = ({ item }) => {
    return (
      <ListView>
        <View style={{flexDirection:'row'}}>
            <ListTitle>
                {item.title}
            </ListTitle>
            <AddButton><Text style={{textAlign:"right"}}>Add</Text></AddButton>
        </View>
        <ListPrice>
            ₹{item.price}
        </ListPrice>
      </ListView>
    );
  };

  return (
    <SafeArea>
      <RestaurantText>{restaurent}</RestaurantText>
      <FlatListStyle
        data={flatlistData}
        renderItem={renderItem}
        keyExtractor={(item) => item.title}
      />
    </SafeArea>
  );
}

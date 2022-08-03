import React from "react";
import { Text, FlatList } from "react-native";
import { SafeArea } from "../../../utils/components/safe-area.components";
import styled from "styled-components/native";

const rt = styled.Text`
  //padding: ${(props) => props.theme.space[2]};
  color: "blue";
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
      <Text>
        {item.title} {item.price}
      </Text>
    );
  };

  return (
    <SafeArea>
      <rt>{restaurent}</rt>
      <FlatList
        data={flatlistData}
        renderItem={renderItem}
        keyExtractor={(item) => item.title}
      />
    </SafeArea>
  );
};

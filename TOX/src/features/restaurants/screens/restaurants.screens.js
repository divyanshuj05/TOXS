import React from "react";
import { SafeAreaView, StatusBar, Text, View, FlatList } from "react-native";
import { Searchbar } from "react-native-paper";
import { RestaurantInfoCard } from "../components/restaurantInfoCard.components.js";
import styled from "styled-components/native";

const Container = styled.SafeAreaView`
    flex:1;
    margin-top: ${StatusBar.currentHeight}px;
`;

const SearchContainer = styled.View`
    padding: ${(props) => props.theme.space[3]};
    background-color: ${(props) => props.theme.colors.ui.primary};
`;

const CardContainer = styled.View`
    flex:1;
    padding: ${(props) => props.theme.space[3]};
    background-color: ${(props) => props.theme.colors.brand.primary};
`;

export const RestaurantScreen = () => {
    return (
        <Container>
            <StatusBar backgroundColor="white" />
            <SearchContainer>
                <Searchbar placeholder="Search" />
            </SearchContainer>
            <CardContainer>
                <FlatList
                    data={[{ name: 1 }, { name: 2 }, { name: 3 }, { name: 4 }, { name: 5 }, { name: 6 }]}
                    renderItem={() => <RestaurantInfoCard />}
                    keyExtractor={(item) => item.name}
                />
            </CardContainer>
        </Container>
    );
};
import React from "react";
import { TouchableOpacity, StatusBar, FlatList, Text } from "react-native";
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

export const RestaurantScreen = ({ navigation }) => {
    return (
        <Container>
            <StatusBar backgroundColor="white" />
            <SearchContainer>
                <Searchbar placeholder="Search" />
            </SearchContainer>
            <CardContainer>
                <FlatList
                    data={[{ name: "Wrapchik" }, { name: "Sip n Bites" }, { name: "Pizza Nation" }, { name: "G Cafeteria" }, { name: "A Cafeteria" }, { name: "Dessert Club" }]}
                    renderItem={({item}) =>
                        <TouchableOpacity onPress={() => navigation.navigate("RestaurantsDetail",{restaurent:item.name})}>
                            <RestaurantInfoCard restaurantName={item.name} />
                        </TouchableOpacity>}
                    keyExtractor={(item) => item.name}
                />
            </CardContainer>
        </Container>
    );
};
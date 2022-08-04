import React, { useContext } from "react";
import { TouchableOpacity, StatusBar, FlatList, View } from "react-native";
import { RestaurantInfoCard } from "../components/restaurantInfoCard.components.js";
import styled from "styled-components/native";
import { DropDownComponent } from "../components/dropdown.components.js";
import { RestaurantContext } from "../../../services/restaurant/restaurant-block.context.js";
import { ActivityIndicator, Colors } from "react-native-paper";

const Container = styled.SafeAreaView`
    flex:1;
    margin-top: ${StatusBar.currentHeight}px;
`;

const DropDownContainer = styled.View`
    padding: ${(props) => props.theme.space[3]};
`;

const CardContainer = styled.View`
    flex:1;
    padding: ${(props) => props.theme.space[3]};
    background-color: ${(props) => props.theme.colors.brand.primary};
`;

export const RestaurantScreen = ({ navigation }) => {

    const { restaurants, isLoading } = useContext(RestaurantContext);

    return (
        <Container>
            <StatusBar backgroundColor="white" />
            <DropDownContainer>
                <DropDownComponent />
            </DropDownContainer>
            <CardContainer>
                {isLoading ?
                    (
                        <View>
                            <ActivityIndicator color={Colors.red400} size={50} />
                        </View>
                    ) :
                    (
                        <FlatList
                            data={restaurants}
                            renderItem={({ item }) =>
                                <TouchableOpacity onPress={() => navigation.navigate("RestaurantsDetail", { restaurent: item.Name })}>
                                    <RestaurantInfoCard restaurantName={item.Name} />
                                </TouchableOpacity>}
                            keyExtractor={(item) => item.Name}
                        />
                    )
                }

            </CardContainer>
        </Container>
    );
};


import React, { useContext } from "react";
import { TouchableOpacity, StatusBar, FlatList, View, Text } from "react-native";
import { RestaurantInfoCard } from "../components/restaurantInfoCard.components.js";
import styled from "styled-components/native";
import { FadeInView } from "../../common/components/animations/fade.animation"
import { DropDownComponent } from "../components/dropdown.components.js";
import { RestaurantContext } from "../../../services/restaurant/restaurant-block.context.js";
import { ActivityIndicator, Colors } from "react-native-paper";
import { FavouritesContext } from "../../../services/restaurant/favourites.context.js";
import { FavBar } from "../components/favouritesBar.components.js";

const Container = styled.SafeAreaView`
    flex:1;
    margin-top: ${StatusBar.currentHeight}px;
`;

const DropDownContainer = styled.View`
    padding: ${(props) => props.theme.space[3]};
    background-color:${(props) => props.theme.colors.ui.basic};
`;

const CardContainer = styled.View`
    flex:1;
    padding: ${(props) => props.theme.space[3]};
    background-color: ${(props) => props.theme.background};
`;

const FavWrap = styled.View`
    flex:0.3;
    background-color: ${(props) => props.theme.background};
    padding: ${(props) => props.theme.space[1]};
`;

export const RestaurantScreen = ({ navigation }) => {

    const { restaurants, restaurantCopy, isCopyLoading, isLoading } = useContext(RestaurantContext);
    const { favourites, addFavoutites, removeFavorites } = useContext(FavouritesContext)

    return (
        <Container>
            <DropDownContainer>
                <DropDownComponent restaurant={restaurantCopy} />
            </DropDownContainer>

            {favourites.length === 0 || favourites === null ?
                (<></>) : (<FavWrap>
                    {isCopyLoading ? (
                        <View style={{ marginTop: 50 }}>
                            <ActivityIndicator color={Colors.red400} size={50} />
                        </View>
                    ) : (
                        <FavBar favourites={favourites} restaurants={restaurantCopy} navigation={navigation} />
                    )}

                </FavWrap>)
            }
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
                                    <FadeInView>
                                        <RestaurantInfoCard restaurant={item} favourites={favourites} add={addFavoutites} remove={removeFavorites} />
                                    </FadeInView>
                                </TouchableOpacity>}
                            keyExtractor={(item) => item.Name}
                        />
                    )
                }

            </CardContainer>
        </Container>
    );
};


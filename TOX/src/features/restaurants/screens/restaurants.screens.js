import React, { useContext } from "react";
import { TouchableOpacity, FlatList, View, Alert } from "react-native";
import { RestaurantInfoCard } from "../components/restaurantInfoCard.components.js";
import styled from "styled-components/native";
import { FadeInView } from "../../common/components/animations/fade.animation"
import { DropDownComponent } from "../components/dropdown.components.js";
import { RestaurantContext } from "../../../services/restaurant/restaurant-block.context.js";
import { ActivityIndicator, Colors } from "react-native-paper";
import { FavouritesContext } from "../../../services/restaurant/favourites.context.js";
import { FavBar } from "../components/favouritesBar.components.js";
import { DeviceOrientationContext } from "../../../services/common/deviceOrientation.context.js";

const Container = styled.SafeAreaView`
    flex:1;
`;

const Orientation=styled.View`
    flex:1
    background-color: ${(props) => props.theme.background}; 
`;

const DropDownContainer = styled.View`
    padding: ${(props) => props.theme.space[3]};
    background-color:${(props) => props.theme.colors.ui.basic};
`;

const DropDownContainerLand =  styled.View`
padding: ${(props) => props.theme.space[2]};
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

const FavWrapLand = styled.View`
    flex:1;
    background-color: ${(props) => props.theme.background};
    padding: ${(props) => props.theme.space[1]};
`;

export const RestaurantScreen = ({ navigation }) => {

    const { restaurants, restaurantCopy, isCopyLoading, isLoading } = useContext(RestaurantContext);
    const { favourites, addFavoutites, removeFavorites } = useContext(FavouritesContext)
    const { orientation } = useContext(DeviceOrientationContext)

    return (
        <Container>
            {orientation==1||orientation==2?
                (   
                    <>
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
                            <FavBar favourites={favourites} restaurants={restaurantCopy} navigation={navigation} oriTag={0} />
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
                                        <TouchableOpacity onPress={() => 
                                            {
                                                if(item.isOpen=="false")
                                                {
                                                    Alert.alert(
                                                        "Cafeteria is closed right now!",
                                                        "Still want to order?",
                                                        [
                                        
                                                            {
                                                                text: "Yes",
                                                                onPress: () => { navigation.navigate("RestaurantsDetail", { restaurent: item.Name,tag:0}) }
                                                            },
                                                            {
                                                                text: "No",
                                                                onPress: () => { <></> }
                                                            }
                                                        ]
                                                    )
                                                }
                                                else{
                                                    navigation.navigate("RestaurantsDetail", { restaurent: item.Name,tag:0})
                                                }
                                            }
                                        }>
                                            <FadeInView>
                                                <RestaurantInfoCard restaurant={item} favourites={favourites} add={addFavoutites} remove={removeFavorites} oriTag={0} />
                                            </FadeInView>
                                        </TouchableOpacity>}
                                    keyExtractor={(item) => item.Name
                                    }
                                />
                            )
                        }
                        </CardContainer>
                    </>
                ):
                (
                    <View style={{flexDirection:"row", flex:1}}>
                        {favourites.length === 0 || favourites === null ?
                            (<></>) : 
                            (
                                <View style={{flex:0.15}}>
                                    <FavWrapLand>
                                        {isCopyLoading ? (
                                        <View style={{ marginTop: 50 }}>
                                            <ActivityIndicator color={Colors.red400} size={50} />
                                        </View>
                                        ) : (
                                        <FavBar favourites={favourites} restaurants={restaurantCopy} navigation={navigation} oriTag={1}  />
                                        )}
                                    </FavWrapLand>
                                </View>
                            )
                            }
                        <View style={{flex:favourites.length===0?1:0.85}}>
                            <DropDownContainerLand>
                                <DropDownComponent restaurant={restaurantCopy} />
                            </DropDownContainerLand>
                            <CardContainer>
                            {isLoading ?
                                (
                                    <View>
                                        <ActivityIndicator color={Colors.red400} size={50} />
                                    </View>
                                ) :
                                (
                                    <FlatList
                                        horizontal
                                        data={restaurants}
                                        renderItem={({ item }) =>
                                            <TouchableOpacity onPress={() => {
                                                if(item.isOpen=="false")
                                                {
                                                    Alert.alert(
                                                        "Cafeteria is closed right now!",
                                                        "Still want to order?",
                                                        [
                                        
                                                            {
                                                                text: "Yes",
                                                                onPress: () => { navigation.navigate("RestaurantsDetail", { restaurent: item.Name,tag:0}) }
                                                            },
                                                            {
                                                                text: "No",
                                                                onPress: () => { <></> }
                                                            }
                                                        ]
                                                    )
                                                }
                                                else{
                                                    navigation.navigate("RestaurantsDetail", { restaurent: item.Name,tag:0})
                                                }
                                            }}>
                                                <FadeInView>
                                                    <RestaurantInfoCard restaurant={item} favourites={favourites} add={addFavoutites} remove={removeFavorites} oriTag={1} />
                                                </FadeInView>
                                            </TouchableOpacity>}
                                        keyExtractor={(item) => item.Name}
                                    />
                                )
                            }
                            </CardContainer>
                        </View>
                    </View>
                )
            }
            
        </Container>
    );
};
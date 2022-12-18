import React, { useContext, useEffect, useRef, useState } from "react";
import { TouchableOpacity, FlatList, View, Alert, SafeAreaView, RefreshControl, ScrollView, Text } from "react-native";
import { RestaurantInfoCard } from "../components/restaurantInfoCard.components.js";
import styled from "styled-components/native";
import { FadeInView } from "../../common/components/animations/fade.animation"
import { DropDownComponent } from "../components/dropdown.components.js";
import { RestaurantContext } from "../../../services/restaurant/restaurant-block.context.js";
import { ActivityIndicator, Colors } from "react-native-paper";
import { FavouritesContext } from "../../../services/restaurant/favourites.context.js";
import { FavBar } from "../components/favouritesBar.components.js";
import { DeviceOrientationContext } from "../../../services/common/deviceOrientation.context.js";

const Container = styled(SafeAreaView)`
    flex:1;
    background-color:${props=>props.theme.background}
`;

const DropDownContainer = styled(View)`
    padding: ${(props) => props.theme.space[2]};
    background-color:${(props) => props.theme.colors.ui.basic};
    border-radius:${(props) => props.theme.space[4]};
    margin-horizontal:16px
    margin-top:${(props) => props.theme.space[3]};
`;

const DropDownContainerLand =  styled(View)`
    padding: ${(props) => props.theme.space[2]};
    background-color:${(props) => props.theme.colors.ui.basic};
    border-radius:${(props) => props.theme.space[4]};
    margin-horizontal:16px
    margin-top:${(props) => props.theme.space[1]};
`;

const CardContainer = styled(View)`
    flex:1;
    padding: 12px;
    background-color: ${(props) => props.theme.background};
`;

const FavWrap = styled(View)`
    flex:0.23;
    background-color: ${(props) => props.theme.background};
    padding: ${(props) => props.theme.space[3]};
`;

const FavWrapLand = styled(View)`
    flex:1;
    background-color: ${(props) => props.theme.background};
    padding: ${(props) => props.theme.space[1]};
`;

const Empty=styled(Text)`
    color: ${props=>props.theme.text}
    text-align:center
    font-size:${props=>props.theme.fontSizes.h5}
    padding-top:${props=>props.theme.space[6]}
    font-family:${props=>props.theme.fonts.body}
`;


export const RestaurantScreen = ({ navigation }) => {

    const { restaurants, restaurantCopy, isCopyLoading, isLoading, sortByAddress, refresh, Search } = useContext(RestaurantContext);
    const [restaurantsLocal,setRestaurantsLocal]=useState(null)
    const { favourites, addFavoutites, removeFavorites } = useContext(FavouritesContext)
    const { orientation } = useContext(DeviceOrientationContext)
    const [value,setValue]=useState(null)
    const isMounted=useRef(false)

    useEffect(()=>{
        if(isMounted.current===true) 
        {
            sortByAddress(value)
        }
        isMounted.current=true
    },[value])

    useEffect(()=>{
        setRestaurantsLocal(restaurants)
    },[refresh])

    const onRefresh = () => {
        Search()
        setValue("Select All")
    }

    if(!restaurantsLocal)
    {
        return(
            <Container>
                <View style={{ marginTop: 50 }}>
                    <ActivityIndicator color={Colors.red400} size={50} />
                </View>
            </Container>
        )
    }

    return (
        <Container>
            {orientation==1||orientation==2?
                (   
                    <>
                        <DropDownContainer>
                            <DropDownComponent restaurant={restaurantCopy} value={value} setValue={setValue} />
                        </DropDownContainer>

                        {favourites.length === 0 || favourites === null ?
                        (<></>) : 
                        (
                            value===null||value==="Select All"?
                            (
                                <FavWrap>
                                {isCopyLoading||isLoading ? 
                                (
                                    <View style={{ marginTop: 50 }}>
                                        <ActivityIndicator color={Colors.red400} size={50} />
                                    </View>
                                ) : 
                                (
                                    <ScrollView>
                                        <FavBar favourites={favourites} restaurants={restaurantCopy} navigation={navigation} oriTag={0} />
                                    </ScrollView>
                                )}
                                </FavWrap>
                            ):
                            (
                                <></>
                            )
                        )
                        }
                        <CardContainer>
                        {isLoading ?
                            (
                                <View>
                                    <ActivityIndicator color={Colors.red400} size={50} />
                                </View>
                            ) :
                            (
                                restaurantsLocal.length?
                                (
                                    <FlatList
                                        refreshControl={
                                            <RefreshControl 
                                                onRefresh={onRefresh}
                                            />
                                        }
                                        data={restaurantsLocal}
                                        renderItem={({ item }) =>
                                            <TouchableOpacity activeOpacity={0.65} onPress={() => 
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
                                        keyExtractor={(item) => item.Name}
                                    />
                                ):
                                (
                                <>
                                    <FlatList 
                                    refreshControl={
                                        <RefreshControl 
                                            onRefresh={onRefresh}
                                        />
                                    }
                                        data={[{number:1}]}
                                        renderItem={()=><Empty>No items found!!</Empty>}
                                        keyExtractor={(item)=>item.number}
                                    />
                                </>
                                )
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
                                <DropDownComponent restaurant={restaurantCopy} value={value} setValue={setValue} />
                            </DropDownContainerLand>
                            <CardContainer>
                            {isLoading ?
                                (
                                    <View>
                                        <ActivityIndicator color={Colors.red400} size={50} />
                                    </View>
                                ) :
                                (
                                    restaurantsLocal.length?
                                    (
                                        <FlatList
                                            refreshControl={
                                                <RefreshControl 
                                                    onRefresh={onRefresh}
                                                />
                                            }
                                            horizontal
                                            data={restaurantsLocal}
                                            renderItem={({ item }) =>
                                                <TouchableOpacity activeOpacity={0.65} onPress={() => {
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
                                    ):
                                    (
                                        <FlatList 
                                        refreshControl={
                                            <RefreshControl 
                                                onRefresh={onRefresh}
                                            />
                                        }
                                            data={[{number:1}]}
                                            renderItem={()=><Empty>No items found!!</Empty>}
                                            keyExtractor={(item)=>item.number}
                                        />
                                    )
                                    
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
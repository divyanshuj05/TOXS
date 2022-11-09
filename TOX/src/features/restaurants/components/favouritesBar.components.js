import React from 'react'
import { ScrollView, Alert } from "react-native"
import styled from 'styled-components';

const Wrapper = styled.TouchableOpacity`
    margin:${props => props.theme.space[2]}
    align-items:center
`;

const Img = styled.Image`
    width:70px;
    height:70px;
    border-radius:${(props) => props.theme.space[3]};
`;

const FavText = styled.Text`
    font-family: ${props => props.theme.fonts.heading};
    text-align:center;
    color:${props => props.theme.text}
`;

const FavTitle = styled.Text`
    font-size:${props => props.theme.fontSizes.body};
    font-family: ${props => props.theme.fonts.body};
    color:${props => props.theme.text}
    text-align:center
    padding-left: ${(props) => props.theme.space[2]}
`;

export const FavBar = ({ favourites, restaurants, navigation, oriTag }) => {

    return (
        <>
            <FavTitle>Favourites</FavTitle>
            <ScrollView horizontal={oriTag==1?false:true} showsHorizontalScrollIndicator={false}>
                {favourites.map((restaurant) => {
                    const key = restaurant;
                    let icon = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlIOzzTmSEZjWIScs865U59oKTfIK0oz1K2A&usqp=CAU"
                    let isOpen=null
                    if (restaurants) {
                        restaurants.some((ele) => {
                            if (ele.Name == restaurant) {
                                if (ele.icon) {
                                    icon = ele.icon
                                }
                                isOpen=ele.isOpen
                            }
                        })
                    }
                    return (
                        <Wrapper activeOpacity={0.65} key={key} onPress={() => {
                            if(isOpen=="false")
                            {
                                Alert.alert(
                                    "Cafeteria is closed right now!",
                                    "Still want to order?",
                                    [
                    
                                        {
                                            text: "Yes",
                                            onPress: () => { navigation.navigate("RestaurantsDetail", { restaurent: restaurant,tag:0}) }
                                        },
                                        {
                                            text: "No",
                                            onPress: () => { <></> }
                                        }
                                    ]
                                )
                            }
                            else{
                                navigation.navigate("RestaurantsDetail", { restaurent: restaurant })
                            }
                        }}>
                            <Img source={{ uri: icon }} />
                            <FavText>{restaurant}</FavText>
                        </Wrapper>
                    );
                })}
            </ScrollView>
        </>
    );
}
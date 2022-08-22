import React from 'react'
import { ScrollView } from "react-native"
import styled from 'styled-components';

const Wrapper = styled.TouchableOpacity`
    margin:${props => props.theme.space[2]}
`;

const Img = styled.Image`
    width:75px;
    height:75px;
    border-radius:${(props) => props.theme.space[2]};
`;

const FavText = styled.Text`
    font-family: ${props => props.theme.fonts.heading};
    text-align:center;
    color:${props => props.theme.text}
`;

const FavTitle = styled.Text`
    font-family: ${props => props.theme.fonts.body};
    color:${props => props.theme.text}
    padding-left: ${(props) => props.theme.space[2]}
`;

export const FavBar = ({ favourites, restaurants, navigation }) => {

    return (
        <>
            <FavTitle>Favourites</FavTitle>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {favourites.map((restaurant) => {
                    const key = restaurant;
                    let icon = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlIOzzTmSEZjWIScs865U59oKTfIK0oz1K2A&usqp=CAU"
                    if (restaurants) {
                        restaurants.some((ele) => {
                            if (ele.Name == restaurant) {
                                if (ele.icon) {
                                    icon = ele.icon
                                }
                            }
                        })
                    }
                    return (
                        <Wrapper key={key} onPress={() => {
                            navigation.navigate("RestaurantsDetail", { restaurent: restaurant })
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
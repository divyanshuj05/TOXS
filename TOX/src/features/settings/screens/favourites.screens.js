import React, { useContext } from 'react'
import { ScrollView } from 'react-native';
import { FavouritesContext } from '../../../services/restaurant/favourites.context'
import { RestaurantInfoCard } from '../../restaurants/components/restaurantInfoCard.components';
import { RestaurantContext } from '../../../services/restaurant/restaurant-block.context';
import styled from 'styled-components';
import { DeviceOrientationContext } from '../../../services/common/deviceOrientation.context';

const Container = styled.View`
    flex:1;
    background-color:${props => props.theme.background}
`;

const Wrapper = styled.TouchableOpacity`
    margin-horizontal: ${props => props.theme.space[3]};
`;

const TextContainer = styled.Text`
    text-align:center;
    margin-top:${props => props.theme.space[4]};
    margin-bottom: ${props => props.theme.space[3]}; 
    font-family: ${props => props.theme.fonts.body};
    color:${props => props.theme.text}
    font-size:${props => props.theme.fontSizes.body};
`;

export const FavSettingsScreen = ({ navigation }) => {

    const { favourites, addFavoutites, removeFavorites } = useContext(FavouritesContext);
    const { restaurantCopy } = useContext(RestaurantContext)
    const { orientation } = useContext(DeviceOrientationContext)

    if (!favourites.length) {
        return (<Container><TextContainer>No favourites!!</TextContainer></Container>)
    }

    return (
        <Container>
            <TextContainer>My Favourites</TextContainer>
            <ScrollView horizontal={orientation==1||orientation==2?false:true}>
                {favourites.map((restaurant) => {
                    const key = restaurant;
                    let data = []
                    if (restaurantCopy) {
                        restaurantCopy.some((ele) => {
                            if (ele.Name == restaurant) {
                                data = ele
                            }
                        })
                    }
                    return (
                        <Wrapper key={key} onPress={() => {
                            navigation.navigate("Home",{ screen:"RestaurantNavigator" ,params:{screen:"RestaurantsDetail" ,params:{ restaurent: restaurant, tag:1 }}} )
                        }}>
                            <RestaurantInfoCard restaurant={data} favourites={favourites} add={addFavoutites} remove={removeFavorites} oriTag={orientation==1||orientation==2?0:1} />
                        </Wrapper>
                    );
                })}
            </ScrollView>
        </Container>
    );

}
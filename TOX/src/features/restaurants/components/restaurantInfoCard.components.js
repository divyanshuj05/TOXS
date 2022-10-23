import React, { useContext } from 'react';
import { Text, View } from "react-native";
import { Card } from 'react-native-paper';
import styled from 'styled-components/native';
import open from '../../../../assets/open';
import { SvgXml } from 'react-native-svg';
import { Favourite } from './favourite.components';
import { AuthenticationContext } from '../../../services/authentication/authentication.context';

export const RestaurantInfoCard = ({ restaurant = {}, restaurantName, favourites, add, remove }) => {

    const RestaurantInfo = styled.View`
    padding: ${(props) => props.theme.space[2]}
    background-color:${props => props.theme.colors.brand.basic};
    `;

    const Title = styled(Text)`
    font-size: ${(props) => props.theme.fontSizes.title};
    font-weight: ${(props) => props.theme.fontWeights.medium};
    font-family: ${props => props.theme.fonts.heading};
    `;

    const Address = styled.Text`
    font-size: ${(props) => props.theme.fontSizes.body};
    font-weight: ${(props) => props.theme.fontWeights.regular};
    font-family: ${props => props.theme.fonts.body};
    `;

    const RatingStyle = styled.View`
    flex-direction:row;
    padding-top: ${(props) => props.theme.space[1]}
    padding-bottom: ${(props) => props.theme.space[1]}
    `;

    const OpenContainer = styled(View)`
    flex:1;
    flex-direction:row;
    justify-content: flex-end;
    `;

    const Section = styled(View)`
    flex-direction:row;
    align-items:center
    `;

    const CardContainer = styled.View`
    margin:${(props) => props.theme.space[1]};
    `;

    const {
        Name = "Mock Restaurant Name",
        icon = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlIOzzTmSEZjWIScs865U59oKTfIK0oz1K2A&usqp=CAU",
        isOpen,
        address = "Mock Address"
    } = restaurant;

    const { user }=useContext(AuthenticationContext)

    return (
        <CardContainer>
            <Card elevation={5}>
                <View>
                    {user.type=="users"?
                    (
                        <Favourite restaurant={Name} favourites={favourites} add={add} remove={remove} />
                    ):(<></>)
                    }
                    <Card.Cover key={Name} source={{ uri: icon }} style={{ height: 160 }} />
                </View>
                <RestaurantInfo>
                    <Title>{Name}</Title>
                    <Section>
                        <RatingStyle>
                            <OpenContainer>
                                {isOpen == "true" ? (<SvgXml xml={open} width={20} height={20} />) : (<></>)}
                            </OpenContainer>
                        </RatingStyle>
                    </Section>
                    <Address>{address}</Address>
                </RestaurantInfo>
            </Card>
        </CardContainer>
    );
}
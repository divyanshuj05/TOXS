import React from 'react';
import { Text, View } from "react-native";
import { Card } from 'react-native-paper';
import styled from 'styled-components/native';
import open from '../../../../assets/open';
import { SvgXml } from 'react-native-svg';
import { Favourite } from './favourite.components';

export const RestaurantInfoCard = ({ restaurant = {}, restaurantName }) => {

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
        name = "RestaurantName",
        icon = [
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlIOzzTmSEZjWIScs865U59oKTfIK0oz1K2A&usqp=CAU"
        ],
        isOpen = true,
        rating = 4,
        address = "9th Street"
    } = restaurant;


    return (
        <CardContainer>
            <Card elevation={5}>
                <View>
                    <Favourite restaurant={restaurantName} />
                    <Card.Cover key={name} source={{ uri: icon[0] }} style={{ height: 160 }} />
                </View>
                <RestaurantInfo>
                    <Title>{restaurantName}</Title>
                    <Section>
                        <RatingStyle>
                            <OpenContainer>
                                {isOpen && <SvgXml xml={open} width={20} height={20} />}
                            </OpenContainer>
                        </RatingStyle>
                    </Section>
                    <Address>{address}</Address>
                </RestaurantInfo>
            </Card>
        </CardContainer>
    );
}
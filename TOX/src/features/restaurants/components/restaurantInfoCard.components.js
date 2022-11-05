import React, { useContext } from 'react';
import { Text, View } from "react-native";
import { Card } from 'react-native-paper';
import styled from 'styled-components/native';
import open from '../../../../assets/open';
import { SvgXml } from 'react-native-svg';
import { Favourite } from './favourite.components';
import { AuthenticationContext } from '../../../services/authentication/authentication.context';

export const RestaurantInfoCard = ({ restaurant = {}, restaurantName, favourites, add, remove, oriTag }) => {

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

    let CardContainer=styled.View``

    if(oriTag==0)
    {
        CardContainer = styled.View`
            margin:${(props) => props.theme.space[2]};
        `;
    }
    else
    {
        CardContainer = styled.View`
            margin-vertical:${(props) => props.theme.space[1]};
            margin-horizontal:${(props) => props.theme.space[1]};
        `;
    }

    let CardStyle=styled(Card)``;

    if(oriTag==0)
    {
            CardStyle = styled(Card)`
            border-radius:16px
            `;
    }
    else
    {
        CardStyle = styled(Card)`
        border-radius:16px
            width:300px
        `;
    }
    
    const {
        Name = "Mock Restaurant Name",
        icon = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlIOzzTmSEZjWIScs865U59oKTfIK0oz1K2A&usqp=CAU",
        isOpen,
        address = "Mock Address"
    } = restaurant;

    const { user }=useContext(AuthenticationContext)

    return (
        <>
            <CardContainer>
                <CardStyle elevation={5}>
                    <View style={{}}>
                        {user.type=="users"?
                        (
                            <Favourite restaurant={Name} favourites={favourites} add={add} remove={remove} />
                        ):(<></>)
                        }
                        <Card.Cover key={Name} source={{ uri: icon }} style={{ height: 160, borderTopStartRadius:16,borderTopEndRadius:16 }} />
                    </View>
                    <RestaurantInfo style={{borderBottomEndRadius:16,borderBottomStartRadius:16}}>
                        <Title>{Name}</Title>
                        <View style={{flexDirection:"row"}}>
                            <View style={{flex:0.8}}>
                                <Address>{address}</Address>
                            </View>
                            <View style={{flex:0.2}}>
                                <Section>
                                    <RatingStyle>
                                        <OpenContainer>
                                            {isOpen == "true" ? (<SvgXml xml={open} width={20} height={20} />) : (<></>)}
                                        </OpenContainer>
                                    </RatingStyle>
                                </Section>
                            </View>
                            
                        </View>
                    </RestaurantInfo>
                </CardStyle>
            </CardContainer>
            </>
    );
}
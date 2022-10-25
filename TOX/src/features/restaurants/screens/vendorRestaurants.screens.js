import React, { useContext } from 'react'
import { View, FlatList, TouchableOpacity } from "react-native"
import { SafeArea } from '../../../utils/components/safe-area.components';
import { VendorRestaurantContext } from '../../../services/restaurant/vendorRestaurant.context';
import styled from 'styled-components'
import { ActivityIndicator, Colors } from "react-native-paper";
import { RestaurantInfoCard } from '../components/restaurantInfoCard.components';
import { FadeInView } from '../../common/components/animations/fade.animation';

const Container=styled.View`
    flex:1
    background-color: ${props=>props.theme.background}
`;

const HeaderContainer = styled.View`
    padding: ${(props) => props.theme.space[3]};
    background-color:${(props) => props.theme.colors.ui.basic};
    margin-bottom: ${(props) => props.theme.space[4]};
`;

const CardContainer = styled.View`
    flex:1;
    padding: ${(props) => props.theme.space[3]};
    background-color: ${(props) => props.theme.background};
`;

const HeaderText=styled.Text`
    color:${props=>props.theme.colors.bg.primary};
    padding: ${(props) => props.theme.space[2]};
    font-size: ${(props) => props.theme.fontSizes.title};
    font-weight: ${(props) => props.theme.fontWeights.medium};
    font-family: ${props => props.theme.fonts.heading};
`;

export const VendorRestaurantScreen = ({ navigation }) => {

    const { restaurant,isLoading } =useContext(VendorRestaurantContext)

    return(
        <SafeArea>
            <Container>
                <HeaderContainer>
                    <HeaderText>Manage Restaurants</HeaderText>
                </HeaderContainer>
            <CardContainer>
                {isLoading ?
                    (
                        <View>
                            <ActivityIndicator color={Colors.red400} size={50} />
                        </View>
                    ) :
                    (
                        <FlatList
                            data={restaurant}
                            renderItem={({ item }) =>
                                <TouchableOpacity onPress={() => navigation.navigate("RestaurantDetails")}>
                                    <FadeInView>
                                        <RestaurantInfoCard restaurant={item} />
                                    </FadeInView>
                                </TouchableOpacity>}
                            keyExtractor={(item) => item.Name}
                        />
                    )
                }
            </CardContainer>
            </Container>
        </SafeArea>
    )
}
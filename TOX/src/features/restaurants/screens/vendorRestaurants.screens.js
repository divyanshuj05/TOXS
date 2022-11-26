import React, { useContext, useEffect } from 'react'
import { View, FlatList, TouchableOpacity, Text, ScrollView } from "react-native"
import { SafeArea } from '../../../utils/components/safe-area.components';
import { VendorRestaurantContext } from '../../../services/restaurant/vendorRestaurant.context';
import styled from 'styled-components'
import { ActivityIndicator, Colors } from "react-native-paper";
import { RestaurantInfoCard } from '../components/restaurantInfoCard.components';
import { FadeInView } from '../../common/components/animations/fade.animation';
import { DeviceOrientationContext } from '../../../services/common/deviceOrientation.context';
import { AuthenticationContext } from '../../../services/authentication/authentication.context';

const Container=styled(View)`
    flex:1
    background-color: ${props=>props.theme.background}
`;

const HeaderContainer = styled(View)`
    padding: ${(props) => props.theme.space[2]};
    background-color:${(props) => props.theme.colors.ui.basic};
    border-radius:${(props) => props.theme.space[4]};
    margin-horizontal:4px
    margin-top:${(props) => props.theme.space[3]};
`;

const HeaderContainerLand = styled(View)`
    padding: ${(props) => props.theme.space[2]};
    background-color:${(props) => props.theme.colors.ui.basic};
    border-radius:${(props) => props.theme.space[4]};
    margin-horizontal:4px
    margin-top:${(props) => props.theme.space[3]};
`;

const CardContainer = styled(View)`
    flex:1;
    padding: ${(props) => props.theme.space[3]};
    background-color: ${(props) => props.theme.background};
`;

const HeaderText=styled(Text)`
    color:${props=>props.theme.colors.bg.primary};
    padding: ${(props) => props.theme.space[2]};
    font-size: ${(props) => props.theme.fontSizes.title};
    font-weight: ${(props) => props.theme.fontWeights.medium};
    font-family: ${props => props.theme.fonts.heading};
    text-align:center
`;

export const VendorRestaurantScreen = ({ navigation }) => {

    const { restaurant,isLoading, Search } = useContext(VendorRestaurantContext)
    const { orientation } = useContext(DeviceOrientationContext)
    const { user } = useContext(AuthenticationContext)

    useEffect(()=>{
        Search(user.userName)
    },[])

    if(orientation==1||orientation==2)
    {
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
                                <TouchableOpacity activeOpacity={0.65} onPress={() => navigation.navigate("RestaurantDetails",{name:item.Name})}>
                                    <FadeInView>
                                        <RestaurantInfoCard restaurant={item} oriTag={0} />
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
    return(
        <SafeArea>
            <Container>
                <HeaderContainerLand>
                    <HeaderText>Manage Restaurants</HeaderText>
                </HeaderContainerLand>
            <CardContainer>
                {isLoading ?
                    (
                        <View>
                            <ActivityIndicator color={Colors.red400} size={50} />
                        </View>
                    ) :
                    (
                        <ScrollView>
                            <FlatList
                                horizontal
                                data={restaurant}
                                renderItem={({ item }) =>
                                    <TouchableOpacity activeOpacity={0.65} onPress={() => navigation.navigate("RestaurantDetails")}>
                                        <FadeInView>
                                            <RestaurantInfoCard restaurant={item} oriTag={1} />
                                        </FadeInView>
                                    </TouchableOpacity>}
                                keyExtractor={(item) => item.Name}
                            />
                        </ScrollView>
                    )
                }
            </CardContainer>
            </Container>
        </SafeArea>
    )
}
import React from 'react';
import { StatusBar, FlatList, TouchableOpacity  } from "react-native";
import styled from 'styled-components';
import { logo, TPO_logo, TLX_logo } from "../../../../assets/images";
import { colors } from '../../../infrastructure/theme/colors';
import { RestaurantScreen } from '../../restaurants/screens/restaurants.screens';
import { NavigationContainer } from '@react-navigation/native';
import { HomeNavigator } from "../../../infrastructure/navigation/home.navigator";
const SafeArea = styled.SafeAreaView`
    background-color: ${(props) => props.theme.colors.bg.secondary}
    flex:1;
    paddding-top:${StatusBar.currentHeight}px;
`;

const Main_Logo = styled.Image`
    margin-top:${(props) => props.theme.space[3]};
    margin-left:${(props) => props.theme.space[5]};
    height: ${(props) => props.theme.sizes[5]};
    `;

const Facility_Logo = styled.Image`
    height: ${(props) => props.theme.sizes[4]};
    width:${(props) => props.theme.sizes[4]};
    margin-left:25px;
    margin-top:${(props) => props.theme.space[4]};
    margin-right:25px;
`;

const App_Name = styled.Text`
    margin-top:${(props) => props.theme.space[2]};
    text-align:center;
    color:${(props) => props.theme.colors.text.primary};
    font-size: ${(props) => props.theme.fontSizes.h5};
    font-weight: ${(props) => props.theme.fontWeights.medium};
    font-family: ${props => props.theme.fonts.heading};
`;

const Facility_Text = styled.Text`
    font-weight:${(props) => props.theme.fontWeights.medium};
    font-size:${(props) => props.theme.fontSizes.body};
    font-family: ${props => props.theme.fonts.body};
    color:${props => props.color}
    text-align:center;
`;

const Facility_SubText = styled.Text`
    font-weight:${(props) => props.theme.fontWeights.medium};
    font-size:${(props) => props.theme.fontSizes.button};
    font-family: ${props => props.theme.fonts.body};
    color:${props => props.color}
    text-align:center;
`;

const ListWrapper = styled.View`
    background-color: ${props => props.theme.colors.ui.primary};
    margin-left:${(props) => props.theme.space[2]};
    margin-right:${(props) => props.theme.space[1]};
    margin-bottom:${(props) => props.theme.space[4]};
    margin-top: ${(props) => props.theme.space[4]};
    border-radius:${(props) => props.theme.space[3]};
`;

const flatlist_data = [
    {
        icon: TPO_logo,
        text: "TPO",
        subText: "(Thapar Pre-Ordering)",
        color: colors.brand.primary
    },
    {
        icon: TLX_logo,
        text: "TLX",
        subText: "(Thapar Online Exchnage)",
        color: colors.brand.tertiary
    }
]

export const HomeScreen = ({ navigation }) => {

/*    const serviceHandler = (text) => {
        if (text === "TPO") {
            alert(text)
        }
        else {
            alert(text)
        }
    }*/

    return (
        <SafeArea>
            <Main_Logo source={logo} />
            <App_Name>Thapar Pre-Ordering and Exchange Service</App_Name>
            <FlatList
                data={flatlist_data}
                horizontal={true}
                renderItem={({ item }) =>
                    <TouchableOpacity  onPress={() => navigation.navigate("Restaurants")}>
                        <ListWrapper>
                            <Facility_Logo source={item.icon} />
                            <Facility_Text color={item.color}>{item.text}</Facility_Text>
                            <Facility_SubText color={item.color}>{item.subText}</Facility_SubText>
                        </ListWrapper>
                    </TouchableOpacity >}
                keyExtractor={(item) => item.text}
            />
        </SafeArea>
    )
}
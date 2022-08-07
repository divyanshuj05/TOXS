import React, { useContext } from 'react';
import { FlatList, TouchableOpacity } from "react-native";
import styled from 'styled-components';
import { logo, TPO_logo, TLX_logo } from "../../../../assets/images";
import { colors } from '../../../infrastructure/theme/colors';
import { SafeArea } from '../../../utils/components/safe-area.components';
import { Ionicons } from '@expo/vector-icons';
import { AppThemeContext } from '../../../services/common/theme.context';

const ThemeIcon = styled.View`
    align-items:flex-end;
    padding-top:${(props) => props.theme.space[3]};
    padding-right:${(props) => props.theme.space[2]};
`;

const Container = styled.View`
    background-color:${(props) => props.theme.background}
    flex:1;
`;

const Main_Logo = styled.Image`
    margin-top:${(props) => props.theme.space[4]};
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
    color:${(props) => props.theme.text};
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
    background-color: ${(props) => props.theme.colors.ui.basic};
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
        color: colors.bg.primary
    },
    {
        icon: TLX_logo,
        text: "TLX",
        subText: "(Thapar Online Exchnage)",
        color: colors.bg.primary
    }
]

export const HomeScreen = ({ navigation }) => {

    const { setScheme, scheme } = useContext(AppThemeContext);

    return (
        <>
            <SafeArea>
                <Container>
                    <ThemeIcon>
                        {scheme === 'light' ?
                            (
                                <TouchableOpacity onPress={() => { setScheme('dark') }}>
                                    <Ionicons name="bulb" size={26} color="black" />
                                </TouchableOpacity>
                            ) :
                            (
                                <TouchableOpacity onPress={() => { setScheme('light') }}>
                                    <Ionicons name="bulb-outline" size={26} color="white" />
                                </TouchableOpacity>
                            )
                        }
                    </ThemeIcon>
                    <Main_Logo source={logo} />
                    <App_Name>Thapar Pre-Ordering and Exchange Service</App_Name>
                    <FlatList
                        data={flatlist_data}
                        horizontal={true}
                        renderItem={({ item, index }) => {
                            if (index === 0) {
                                return (
                                    <TouchableOpacity onPress={() => navigation.navigate("RestaurantNavigator")}>
                                        <ListWrapper>
                                            <Facility_Logo source={item.icon} />
                                            <Facility_Text color={item.color}>{item.text}</Facility_Text>
                                            <Facility_SubText color={item.color}>{item.subText}</Facility_SubText>
                                        </ListWrapper>
                                    </TouchableOpacity >
                                )
                            }
                            else {
                                return (
                                    <TouchableOpacity onPress={() => navigation.navigate("Exchnage")}>
                                        <ListWrapper>
                                            <Facility_Logo source={item.icon} />
                                            <Facility_Text color={item.color}>{item.text}</Facility_Text>
                                            <Facility_SubText color={item.color}>{item.subText}</Facility_SubText>
                                        </ListWrapper>
                                    </TouchableOpacity >
                                )
                            }
                        }}
                        keyExtractor={(item) => item.text}
                    />
                </Container>
            </SafeArea>
        </>
    )
}
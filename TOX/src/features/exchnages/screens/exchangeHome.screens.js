import React, { useContext } from 'react'
import { TouchableOpacity } from 'react-native';
import { SafeArea } from '../../../utils/components/safe-area.components';
import styled from 'styled-components'
import { logo_dark,logo_light } from '../../../../assets/images';
import { AppThemeContext } from "../../../services/common/theme.context"
import { AntDesign } from '@expo/vector-icons';

const Container=styled.View`
    flex:1;
    background-color: ${props=>props.theme.background}
`;

const Main_Logo = styled.Image`
    margin-top:${(props) => props.theme.space[5]};
    margin-left:${(props) => props.theme.space[5]};
    height: ${(props) => props.theme.sizes[5]};
`;

const Facility_Name = styled.Text`
    margin-vertical:${(props) => props.theme.space[4]};
    text-align:center;
    color:${(props) => props.theme.text};
    font-size: ${(props) => props.theme.fontSizes.h5};
    font-weight: ${(props) => props.theme.fontWeights.medium};
    font-family: ${props => props.theme.fonts.heading};
`;

const Exchange_Facility=styled.View`
    padding: ${(props) => props.theme.space[3]};
    background-color:${(props) => props.theme.colors.ui.basic};
    margin-vertical:${(props) => props.theme.space[3]};
    margin-horizontal:${(props) => props.theme.space[2]};
    border-radius:${(props) => props.theme.space[3]};
`;

const Exchange_Text=styled.Text`
    color:white
    font-size: ${(props) => props.theme.fontSizes.title};
    font-weight: ${(props) => props.theme.fontWeights.medium};
    font-family: ${props => props.theme.fonts.heading};
`;

const App_Name = styled.Text`
    margin-top:${(props) => props.theme.space[4]};
    text-align:center;
    color:${(props) => props.theme.text};
    font-size: ${(props) => props.theme.fontSizes.h5};
    font-weight: ${(props) => props.theme.fontWeights.medium};
    font-family: ${props => props.theme.fonts.heading};
`;

export const ExchangeHome = ({ navigation }) => {

    const { scheme } = useContext(AppThemeContext)

    return(
        <SafeArea>
            <Container>
            {scheme=="light"?
                (
                    <Main_Logo source={logo_light} />
                ):(
                    <Main_Logo source={logo_dark} />
                )}
            <Facility_Name>Thapar Exchange Service</Facility_Name> 
            <Exchange_Facility>
                <TouchableOpacity style={{flexDirection:"row",marginHorizontal:32}} onPress={()=>navigation.navigate("SellHome")} >
                    <Exchange_Text>Sell an item</Exchange_Text>
                    <AntDesign style={{paddingLeft:8}} name="right" size={20} color="white" />
                </TouchableOpacity>
            </Exchange_Facility>
            <Exchange_Facility>
                <TouchableOpacity style={{flexDirection:"row",marginHorizontal:32}} onPress={()=>navigation.navigate("BuyHome")}>
                    <Exchange_Text>Buy an item</Exchange_Text>
                    <AntDesign style={{paddingLeft:8}} name="right" size={20} color="white" />
                </TouchableOpacity>
            </Exchange_Facility>
            <Exchange_Facility>
                <TouchableOpacity style={{flexDirection:"row",marginHorizontal:32}} onPress={()=>navigation.navigate("History")}>
                    <Exchange_Text>My Orders and History</Exchange_Text>
                    <AntDesign style={{paddingLeft:8}} name="right" size={20} color="white" />
                </TouchableOpacity>
            </Exchange_Facility>
            </Container>
        </SafeArea>
    )
}
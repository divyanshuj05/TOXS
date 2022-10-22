import React,{useContext} from 'react'
import { FlatList, TouchableOpacity } from 'react-native';
import { logo_light,logo_dark, TPO_logo, Vendor_Image } from "../../../../assets/images";
import { SafeArea } from '../../../utils/components/safe-area.components';
import styled from 'styled-components';
import { AppThemeContext } from '../../../services/common/theme.context';
import { colors } from '../../../infrastructure/theme/colors';

const Container=styled.View`
    flex:1;
    background-color:${props=>props.theme.background}
`;
const Main_Logo = styled.Image`
    margin-top:${(props) => props.theme.space[5]};
    margin-left:${(props) => props.theme.space[5]};
    height: ${(props) => props.theme.sizes[5]};
`;
const App_Name = styled.Text`
    margin-top:${(props) => props.theme.space[2]};
    text-align:center;
    color:${(props) => props.theme.text};
    font-size: ${(props) => props.theme.fontSizes.h5};
    font-weight: ${(props) => props.theme.fontWeights.medium};
    font-family: ${props => props.theme.fonts.heading};
`;
const ListWrapper = styled.View`
    background-color: ${(props) => props.theme.colors.ui.basic};
    margin-left:${(props) => props.theme.space[2]};
    margin-right:${(props) => props.theme.space[1]};
    margin-top: ${(props) => props.theme.space[4]};
    border-radius:${(props) => props.theme.space[3]};
`;
const Facility_SubText = styled.Text`
    font-weight:${(props) => props.theme.fontWeights.medium};
    font-size:${(props) => props.theme.fontSizes.button};
    font-family: ${props => props.theme.fonts.body};
    color:${props => props.color}
    text-align:center;
`;
const Facility_Text = styled.Text`
    font-weight:${(props) => props.theme.fontWeights.medium};
    font-size:${(props) => props.theme.fontSizes.body};
    font-family: ${props => props.theme.fonts.body};
    color:${props => props.color}
    text-align:center;
`;
const Facility_Logo = styled.Image`
    height: ${(props) => props.theme.sizes[4]};
    width:${(props) => props.theme.sizes[4]};
    margin-left:25px;
    margin-top:${(props) => props.theme.space[4]};
    margin-right:25px;
`;

const flatlist_data = [
    {
        icon: Vendor_Image,
        text: "Manage Cafeteria",
        subText: "Add/Remove/Change food items",
        color: colors.bg.primary
    },
    {
        icon: TPO_logo,
        text: "Order List",
        subText: "Get food orders ",
        color: colors.bg.primary
    }
]

export const VendorHome = ({ navigation }) => {

    const { scheme }=useContext(AppThemeContext)

    return(
        <SafeArea>
            <Container>
                {scheme=="light"?
                (
                    <Main_Logo source={logo_light} />
                ):(
                    <Main_Logo source={logo_dark} />
                )}
                    <App_Name>Thapar Pre-Ordering and Exchange Service</App_Name>
                    <FlatList
                        data={flatlist_data}
                        horizontal={true}
                        renderItem={({ item, index }) => {
                            if (index === 0) {
                                return (
                                    <TouchableOpacity onPress={() => navigation.navigate("VendorRestaurantNavigator")}>
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
                                    <TouchableOpacity onPress={() => navigation.navigate("VendorOrders")}>
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
    )
}
import React, { useContext } from 'react'
import { TouchableOpacity, View } from 'react-native';
import { SafeArea } from '../../../utils/components/safe-area.components';
import styled from 'styled-components'
import { logo_dark,logo_light } from '../../../../assets/images';
import { AppThemeContext } from "../../../services/common/theme.context"
import { AntDesign } from '@expo/vector-icons';
import { DeviceOrientationContext } from '../../../services/common/deviceOrientation.context';

const Container=styled.ScrollView`
    flex:1;
    background-color: ${props=>props.theme.background}
`;

const Main_Logo = styled.Image`
    margin-top:${(props) => props.theme.space[5]};
    margin-left:${(props) => props.theme.space[5]};
    height: ${(props) => props.theme.sizes[5]};
`;

const Main_Logo_Land = styled.Image`
    margin-top:${(props) => props.theme.space[4]};
    margin-left:${(props) => props.theme.space[4]};
    height: ${(props) => props.theme.sizes[5]};
`;

const Facility_Name = styled.Text`
    margin-vertical:${(props) => props.theme.space[3]};
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
    border-radius:${(props) => props.theme.space[4]};
`;

const Exchange_Text=styled.Text`
    color:white
    font-size: ${(props) => props.theme.fontSizes.title};
    font-weight: ${(props) => props.theme.fontWeights.medium};
    font-family: ${props => props.theme.fonts.heading};
`;

export const ExchangeHome = ({ navigation }) => {

    const { scheme } = useContext(AppThemeContext)
    const { orientation } = useContext(DeviceOrientationContext)

    const AppLogoView = () => {
        return(
            <>
            {orientation==1||orientation==2?
                (
                    scheme=="light"?
                    (
                        <Main_Logo source={logo_light} />
                    ):(
                        <Main_Logo source={logo_dark} />
                    )
                ):
                (
                    scheme=="light"?
                    (
                        <Main_Logo_Land source={logo_light} />
                    ):(
                        <Main_Logo_Land source={logo_dark} />
                    )
                )
            }
            </>
        )
    }

    const ContentView = () => {
        return(
            <>
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
            </>
        )
    }

    if(orientation==1||orientation==2)
    {
        return(
            <SafeArea>
                <Container>
                    {AppLogoView()}
                    {ContentView()}
                </Container>
            </SafeArea>
        )
    }
    else{
        return(
            <SafeArea>
                <Container>
                    <View style={{flexDirection:"row"}}>
                        <View style={{flex:0.4, alignItems:"center"}}>
                            {AppLogoView()}
                        </View>
                        <View style={{flex:0.6}}>
                            {ContentView()}
                        </View>
                    </View>
                </Container>
            </SafeArea>
        )
    }

}
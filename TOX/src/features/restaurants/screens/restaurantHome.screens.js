import React, { useContext } from 'react'
import { TouchableOpacity, View } from 'react-native';
import { SafeArea } from '../../../utils/components/safe-area.components'
import styled from 'styled-components'
import { logo_light,logo_dark, } from "../../../../assets/images";
import { AppThemeContext } from '../../../services/common/theme.context';
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
    margin-vertical:${(props) => props.theme.space[4]};
    text-align:center;
    color:${(props) => props.theme.text};
    font-size: ${(props) => props.theme.fontSizes.h5};
    font-weight: ${(props) => props.theme.fontWeights.medium};
    font-family: ${props => props.theme.fonts.heading};
`;

const Restuarant_Facility=styled.View`
    padding: ${(props) => props.theme.space[3]};
    background-color:${(props) => props.theme.colors.ui.basic};
    margin-vertical:${(props) => props.theme.space[3]};
    margin-horizontal:${(props) => props.theme.space[2]};
    border-radius:${(props) => props.theme.space[3]};
`;

const Restaurant_Text=styled.Text`
    color:white
    font-size: ${(props) => props.theme.fontSizes.title};
    font-weight: ${(props) => props.theme.fontWeights.medium};
    font-family: ${props => props.theme.fonts.heading};
`;

export const RestaurantHome = ({ navigation }) => {

    const { scheme } = useContext(AppThemeContext)
    const { orientation,isOrientationLoading } = useContext(DeviceOrientationContext)

    if(orientation==1||orientation==2)
    {
        return(
            <SafeArea>
                <Container>
                    <View style={{alignItems:"center"}}>
                        {scheme=="light"?
                            (
                                <Main_Logo source={logo_light} />
                            ):(
                                <Main_Logo source={logo_dark} />
                            )}
                    </View>
                    <Facility_Name>Thapar Pre-Ordering Service</Facility_Name> 
                    <Restuarant_Facility>
                        <TouchableOpacity style={{flexDirection:"row",marginHorizontal:32}} onPress={()=>navigation.navigate("Restaurants")}>
                            <Restaurant_Text>Pre-Order Food</Restaurant_Text>
                            <AntDesign style={{paddingLeft:8}} name="right" size={20} color="white" />
                        </TouchableOpacity>
                    </Restuarant_Facility>
                    <Restuarant_Facility>
                        <TouchableOpacity style={{flexDirection:"row",marginHorizontal:32}}>
                            <Restaurant_Text>My Order History</Restaurant_Text>
                            <AntDesign style={{paddingLeft:8}} name="right" size={20} color="white" />
                        </TouchableOpacity>
                    </Restuarant_Facility>
                </Container>
            </SafeArea>
            
        )
    }
    return(
        <SafeArea>
            <Container>
                <View style={{flexDirection:"row"}}>
                    <View style={{alignItems:"center", flex:0.4}}>
                        {scheme=="light"?
                            (
                                <Main_Logo_Land source={logo_light} />
                            ):(
                                <Main_Logo_Land source={logo_dark} />
                            )}
                    </View>
                    <View style={{flex:0.6}}>
                        <Facility_Name>Thapar Pre-Ordering Service</Facility_Name> 
                        <Restuarant_Facility>
                            <TouchableOpacity style={{flexDirection:"row",marginHorizontal:32}} onPress={()=>navigation.navigate("Restaurants")}>
                                <Restaurant_Text>Pre-Order Food</Restaurant_Text>
                                <AntDesign style={{paddingLeft:8}} name="right" size={20} color="white" />
                            </TouchableOpacity>
                        </Restuarant_Facility>
                        <Restuarant_Facility>
                            <TouchableOpacity style={{flexDirection:"row",marginHorizontal:32}}>
                                <Restaurant_Text>My Order History</Restaurant_Text>
                                <AntDesign style={{paddingLeft:8}} name="right" size={20} color="white" />
                            </TouchableOpacity>
                        </Restuarant_Facility>
                    </View>
                </View>
            </Container>
        </SafeArea>
    )
}
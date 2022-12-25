import React, { useContext, useEffect } from 'react'
import styled from 'styled-components'
import { logo_light,logo_dark } from "../../../../assets/images";
import { Text, View, Image, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native"
import { SafeArea } from '../../../utils/components/safe-area.components';
import { AppThemeContext } from '../../../services/common/theme.context';
import { AntDesign,Ionicons } from '@expo/vector-icons';
import { AuthenticationContext } from '../../../services/authentication/authentication.context';
import { DeviceOrientationContext } from "../../../services/common/deviceOrientation.context"
import { RestaurantHistoryContext } from '../../../services/restaurant/orderHistory.context';

const Container=styled(View)`
    background-color: ${(props)=>props.theme.background}
    flex:1
`;

const Main_Logo = styled(Image)`
    margin-top:${(props) => props.theme.space[5]};
    margin-left:${(props) => props.theme.space[3]};
    height: ${(props) => props.theme.sizes[5]};
`;

const Main_Logo_Land = styled(Image)`
    margin-top:${(props) => props.theme.space[4]};
    margin-left:${(props) => props.theme.space[4]};
    height: ${(props) => props.theme.sizes[5]};
`;

const Facility_Name = styled(Text)`
    margin-vertical:${(props) => props.theme.space[4]};
    text-align:center;
    color:${(props) => props.theme.text};
    font-size: ${(props) => props.theme.fontSizes.h5};
    font-weight: ${(props) => props.theme.fontWeights.medium};
    font-family: ${props => props.theme.fonts.heading};
`;

const Restuarant_Facility=styled(View)`
    padding: ${(props) => props.theme.space[3]};
    background-color:${(props) => props.theme.colors.ui.basic};
    margin-vertical:${(props) => props.theme.space[3]};
    margin-horizontal:${(props) => props.theme.space[2]};
    border-radius:${(props) => props.theme.space[4]};
`;

const Restaurant_Text=styled(Text)`
    color:white
    font-size: ${(props) => props.theme.fontSizes.title};
    font-weight: ${(props) => props.theme.fontWeights.medium};
    font-family: ${props => props.theme.fonts.heading};
`;

export const DeliveryHome = ({ navigation }) => {

    const { scheme, setScheme } = useContext(AppThemeContext)
    const { onLogout, user } = useContext(AuthenticationContext)
    const { orientation,isOrientationLoading } = useContext(DeviceOrientationContext)
    const { SearchHistory } = useContext(RestaurantHistoryContext)

    useEffect(()=>{
        SearchHistory(user.userName,"vendors")
    },[])

    if(isOrientationLoading){
        <SafeArea>
            <Container>
                <ActivityIndicator color="purple" size={50} style={{marginTop:50}}  />
            </Container>
        </SafeArea>
    }

    if(orientation==1||orientation==2)
    {
        return(
        <SafeArea>
            <ScrollView contentContainerStyle={{flexGrow:1}}>
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
                    <TouchableOpacity activeOpacity={0.65} style={{flexDirection:"row",marginHorizontal:32}} onPress={()=>navigation.navigate("OrderHistory")}>
                        <Restaurant_Text>Order List</Restaurant_Text>
                        <AntDesign style={{paddingLeft:8}} name="right" size={20} color="white" />
                    </TouchableOpacity>
                </Restuarant_Facility>
                <Restuarant_Facility>
                    <TouchableOpacity activeOpacity={0.65} style={{flexDirection:"row",marginHorizontal:32}} onPress={()=>scheme == "light" ? (setScheme("dark")) : (setScheme("light"))}>
                        <AntDesign style={{paddingRight:8}} name="bulb1" size={20} color="white" />
                        <Restaurant_Text>Change Theme</Restaurant_Text>
                    </TouchableOpacity>
                </Restuarant_Facility>
                <Restuarant_Facility>
                    <TouchableOpacity activeOpacity={0.65} style={{flexDirection:"row",marginHorizontal:32}} onPress={()=>onLogout()}>
                        <Ionicons style={{paddingRight:8}} name="log-out-outline" size={20} color="white" />
                        <Restaurant_Text>Log Out</Restaurant_Text>
                    </TouchableOpacity>
                </Restuarant_Facility>
                </Container>
            </ScrollView>
        </SafeArea>
        )
    }

    return(
        <SafeArea>
            <ScrollView contentContainerStyle={{flexGrow:1}}>
                <Container>
                    <View style={{flexDirection:"row"}}>
                        <View style={{alignItems:"center",flex:0.4}}>
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
                            <TouchableOpacity activeOpacity={0.65} style={{flexDirection:"row",marginHorizontal:32}} onPress={()=>null}>
                                <Restaurant_Text>Order List</Restaurant_Text>
                                <AntDesign style={{paddingLeft:8}} name="right" size={20} color="white" />
                            </TouchableOpacity>
                        </Restuarant_Facility>
                        <Restuarant_Facility>
                            <TouchableOpacity activeOpacity={0.65} style={{flexDirection:"row",marginHorizontal:32}} onPress={()=>scheme == "light" ? (setScheme("dark")) : (setScheme("light"))}>
                                <AntDesign style={{paddingRight:8}} name="bulb1" size={20} color="white" />
                                <Restaurant_Text>Change Theme</Restaurant_Text>
                            </TouchableOpacity>
                        </Restuarant_Facility>
                        <Restuarant_Facility>
                            <TouchableOpacity activeOpacity={0.65} style={{flexDirection:"row",marginHorizontal:32}} onPress={()=>onLogout()}>
                                <Ionicons style={{paddingRight:8}} name="log-out-outline" size={20} color="white" />
                                <Restaurant_Text>Log Out</Restaurant_Text>
                            </TouchableOpacity>
                        </Restuarant_Facility>
                        </View>
                    </View>
                </Container>
            </ScrollView>
        </SafeArea>
    )
}
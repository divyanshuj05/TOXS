import React,{useContext} from 'react';
import { FlatList, TouchableOpacity, View, ScrollView,Text,Image } from "react-native";
import styled from 'styled-components';
import { AppThemeContext } from '../../../services/common/theme.context';
import { logo_light,logo_dark, TPO_logo, TLX_logo } from "../../../../assets/images";
import { colors } from '../../../infrastructure/theme/colors';
import { SafeArea } from '../../../utils/components/safe-area.components';
import { DeviceOrientationContext } from '../../../services/common/deviceOrientation.context';
import { ActivityIndicator, Colors } from "react-native-paper";

const Container = styled(ScrollView)`
    background-color:${(props) => props.theme.background};
    flex:1;
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

const Facility_Logo = styled(Image)`
    height: ${(props) => props.theme.sizes[4]};
    width:${(props) => props.theme.sizes[4]};
    margin-left:25px;
    margin-top:${(props) => props.theme.space[4]};
    margin-right:25px;
    border-radius:16px
`;

const App_Name = styled(Text)`
    margin-top:${(props) => props.theme.space[2]};
    text-align:center;
    color:${(props) => props.theme.text};
    font-size: ${(props) => props.theme.fontSizes.h5};
    font-weight: ${(props) => props.theme.fontWeights.medium};
    font-family: ${props => props.theme.fonts.heading};
`;

const Facility_Text = styled(Text)`
    font-weight:${(props) => props.theme.fontWeights.medium};
    font-size:${(props) => props.theme.fontSizes.body};
    font-family: ${props => props.theme.fonts.body};
    color:${props => props.color}
    text-align:center;
`;

const Facility_SubText = styled(Text)`
    font-weight:${(props) => props.theme.fontWeights.medium};
    font-size:${(props) => props.theme.fontSizes.button};
    font-family: ${props => props.theme.fonts.body};
    color:${props => props.color}
    text-align:center;
    margin-bottom:${(props) => props.theme.space[3]};
`;

const ListWrapper = styled(View)`
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
        text: "TEX",
        subText: "(Thapar Online Exchange)",
        color: colors.bg.primary
    }
]

export const HomeScreen = ({ navigation }) => {

    const { scheme } =useContext(AppThemeContext)
    const { orientation, isOrientationLoading } = useContext(DeviceOrientationContext)
    
    if(isOrientationLoading)
    {
        return(
            <View style={{ flex:1,backgroundColor:scheme === "dark" ? "black" : "white" }}>
                <ActivityIndicator style={{marginTop:50}} color={Colors.red400} size={50} />
            </View>
        )
    }

    if(orientation==1||orientation==2)
    {
        return(
            <>
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
                        <App_Name>Thapar Pre-Ordering and Exchange Service</App_Name> 
                        <View style={{alignItems:"center"}}>
                        <FlatList
                            data={flatlist_data}
                            horizontal={true}
                            renderItem={({ item, index }) => {
                                if (index === 0) {
                                    return (
                                        <TouchableOpacity activeOpacity={0.65} onPress={() => navigation.navigate("RestaurantNavigator")}>
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
                                        <TouchableOpacity activeOpacity={0.65} onPress={() => navigation.navigate("Exchnage")}>
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
                        </View>
                    </Container>
                </SafeArea>
            </>
        )
    }
    return (
        <>
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
                            <App_Name>Thapar Pre-Ordering and Exchange Service</App_Name> 
                            <View style={{alignItems:"center"}}>
                            <FlatList
                                data={flatlist_data}
                                horizontal={true}
                                renderItem={({ item, index }) => {
                                    if (index === 0) {
                                        return (
                                            <TouchableOpacity activeOpacity={0.65} onPress={() => navigation.navigate("RestaurantNavigator")}>
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
                                            <TouchableOpacity activeOpacity={0.65} onPress={() => navigation.navigate("Exchnage")}>
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
                            </View>
                        </View>
                    </View>
                </Container>
            </SafeArea>
        </>
    )
}
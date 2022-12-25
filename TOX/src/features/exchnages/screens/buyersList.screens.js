import React, {useContext} from 'react'
import { Text, View, Linking, ActivityIndicator, Platform, TouchableOpacity, FlatList } from 'react-native';
import styled from 'styled-components'
import { ExchangeContext } from '../../../services/exchnage/exchange.context';
import { Ionicons, Fontisto } from '@expo/vector-icons';
import { AppThemeContext } from '../../../services/common/theme.context';

const Container=styled(View)`
    flex:1
    background-color:${props=>props.theme.background}
`;

const Head=styled(Text)`
    color:${props=>props.theme.text}
    text-align:center
    font-size: ${(props) => props.theme.fontSizes.h5};
    font-weight: ${(props) => props.theme.fontWeights.medium};
    font-family: ${props => props.theme.fonts.body};
    margin-vertical:${(props) => props.theme.space[3]};
`;

const BorderView = styled(View)`
    border-bottom-width: 0.5px;
    border-bottom-color:${props => props.theme.colors.brand.basic};
    margin-horizontal:18px
`;

const Desc=styled(Text)`
    color:${props=>props.theme.text}
    font-size: ${(props) => props.theme.fontSizes.body};
    font-weight: ${(props) => props.theme.fontWeights.medium};
    margin-vertical:${(props) => props.theme.space[3]};
`;

export const BuyersList = ({ route }) => {

    const { details }=route.params
    const { scheme }=useContext(AppThemeContext)
    const { buyersData }=useContext(ExchangeContext)

    const handleMail = (mail) => {
        Linking.openURL(`mailto: ${mail}`)
    }   

    const handleMobile = (mobile) => {
        if(Platform.OS==="android"){
            Linking.openURL(`tel:${mobile}`)
        }
        else if(Platform.OS==="ios"){
            Linking.openURL(`telprompt:${mobile}`)
        }
    }

    const renderItem = (ele) => {
        return(
            <BorderView>
                <View style={{flexDirection:"row"}}>
                    <View style={{flex:0.5,alignItems:"center"}}>
                        <Desc style={{color:scheme=="dark"?"white":"#191919"}}>{ele.item.mail}</Desc>
                    </View>
                    <View style={{flex:0.1,alignItems:"center",justifyContent:"center"}}>
                        <TouchableOpacity activeOpacity={0.65} onPress={()=>handleMail(ele.item.mail)}>
                            <Fontisto name="email" size={24} color={scheme=="dark"?"white":"#191919"} />
                        </TouchableOpacity>
                    </View>
                    {ele.item.mobile===null?
                    (
                        <View style={{flex:0.4,alignItems:"center",justifyContent:"center"}}>
                            <ActivityIndicator size={20} color={"purple"}/>
                        </View>
                    ):
                    (
                        ele.item.mobile=="No"?
                        (
                            <>
                                <View style={{flex:0.4, alignItems:"center"}}>
                                    <Desc>Buyer has disabled permission</Desc>
                                </View>
                            </>
                        ):
                        (
                            <>
                                <View style={{flex:0.3, alignItems:"center"}}>
                                    <Desc style={{color:scheme=="dark"?"white":"#191919"}}>{ele.item.mobile}</Desc>
                                </View>
                                <View style={{flex:0.1,alignItems:"center",justifyContent:"center"}}>
                                    <TouchableOpacity activeOpacity={0.65} onPress={()=>handleMobile(ele.item.mobile)}>
                                        <Ionicons name="call-outline" size={24} color={scheme=="dark"?"white":"#191919"} />
                                    </TouchableOpacity>
                                </View>
                            </>
                        )
                    )
                    }
                </View>
            </BorderView>
        )
    }

    return(
        <Container>
            <Head>Buyers List for item {details.name}</Head>
            <FlatList 
                data={buyersData}
                renderItem={renderItem}
                keyExtractor={(ele)=>ele.mail}
            />
        </Container>
    )
}
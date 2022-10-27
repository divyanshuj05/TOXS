import React,{ useContext, useEffect } from 'react'
import { View, FlatList, TouchableOpacity } from 'react-native';
import { FadeInView } from "../../common/components/animations/fade.animation"
import { ItemInfoCard } from "../components/itemInfoCard.components"
import styled from 'styled-components'
import { ExchangeHistoryContext } from '../../../services/exchnage/historyExchnage.context'
import { ActivityIndicator, Colors } from "react-native-paper";

const Container=styled.View`
    flex:1
    background-color:${props=>props.theme.background}
`;

const Head=styled.Text`
    color:${props=>props.theme.text}
    text-align:center
    font-size: ${(props) => props.theme.fontSizes.h5};
    font-weight: ${(props) => props.theme.fontWeights.medium};
    font-family: ${props => props.theme.fonts.body};
    margin-vertical:${(props) => props.theme.space[3]};
`;

const Empty=styled.Text`
    color: ${props=>props.theme.text}
    text-align:center
    font-size:${props=>props.theme.fontSizes.h5}
    padding-top:${props=>props.theme.space[6]}
    font-family:${props=>props.theme.fonts.body}
`;

export const ExchangeHistory = ({ navigation }) => {

    const { detailsLoading, history, UserData } = useContext(ExchangeHistoryContext)

    useEffect(()=>{
        UserData()
    },[])

    const renderItem = (item) => {
        return(
            <TouchableOpacity onPress={()=>navigation.navigate("ItemDetails",{details:item.item,get:1})}>
                <FadeInView>
                    <ItemInfoCard item={item} />
                </FadeInView>
            </TouchableOpacity>
        )
    }

    return(
        <Container>
            <Head>My Orders and History</Head>
            {detailsLoading?
            (
                <View style={{ marginTop: 50 }}>
                    <ActivityIndicator color={Colors.red400} size={50} />
                </View>
            ):
            (   
                history.length?
                    (
                        <FlatList 
                            data={history}
                            renderItem={renderItem}
                            keyExtractor={(item)=>item.imgName}
                        />
                    ):(
                        <Empty>No items found!!</Empty>
                    )
            )}
        </Container>
    )
}
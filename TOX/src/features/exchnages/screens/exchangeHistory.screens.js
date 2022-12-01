import React,{ useContext, useRef } from 'react'
import { View, FlatList, TouchableOpacity, Text, ScrollView, RefreshControl } from 'react-native';
import { FadeInView } from "../../common/components/animations/fade.animation"
import { ItemInfoCard } from "../components/itemInfoCard.components"
import styled from 'styled-components'
import { ExchangeHistoryContext } from '../../../services/exchnage/historyExchnage.context'
import { ActivityIndicator, Colors } from "react-native-paper";
import { DeviceOrientationContext } from '../../../services/common/deviceOrientation.context';
import { HistoryFilterComponent } from '../../restaurants/components/historyDropdown.components';

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
    margin-vertical:${(props) => props.theme.space[2]};
`;

const Empty=styled(Text)`
    color: ${props=>props.theme.text}
    text-align:center
    font-size:${props=>props.theme.fontSizes.h5}
    padding-top:${props=>props.theme.space[6]}
    font-family:${props=>props.theme.fonts.body}
`;

const DropdownWrapper = styled(View)`
    background-color:${props=>props.theme.colors.ui.basic}
    padding:2px
    flex:0.45
    border-radius:${props=>props.theme.space[4]}
    margin-vertical:12px
`;

export const ExchangeHistory = ({ navigation }) => {

    const { detailsLoading, history, UserData, SearchByStatus } = useContext(ExchangeHistoryContext)
    const { orientation } = useContext(DeviceOrientationContext)
    const status=useRef()

    const options=[
        { label: 'Available', value: 'Available' },
        { label: 'On Hold', value: 'On Hold' },
        { label: 'Removed by seller', value: 'Removed by seller' },
        { label: 'Sold', value: 'Sold' },
        { label: 'Select All', value: 'Select All' }
    ]

    const renderItem = (item) => {
        return(
            <TouchableOpacity activeOpacity={0.65} onPress={()=>navigation.navigate("ItemDetails",{details:item.item,get:1})}>
                <FadeInView>
                    <ItemInfoCard item={item} />
                </FadeInView>
            </TouchableOpacity>
        )
    }

    const onRefresh = () => {
        UserData()
        status.current="Select All"
    }

    return(
        <Container>
            <View style={{flexDirection:"row"}}>
                <View style={{flex:0.53}}>
                    <Head>My History</Head>
                </View>
                <DropdownWrapper>
                    <HistoryFilterComponent 
                    status={status} options={options} SearchByStatus={SearchByStatus}/>
                </DropdownWrapper>
            </View>
            {detailsLoading?
            (
                <View style={{ marginTop: 50 }}>
                    <ActivityIndicator color={Colors.red400} size={50} />
                </View>
            ):
            (   
                history.length?
                    (
                        orientation==1||orientation==2?
                        (
                            <FlatList 
                                refreshControl={
                                    <RefreshControl 
                                        onRefresh={onRefresh}   
                                    />
                                }
                                horizontal={false}
                                data={history}
                                renderItem={renderItem}
                                keyExtractor={(item)=>item.imgName}
                            />
                        ):
                        (
                            <ScrollView
                                refreshControl={
                                    <RefreshControl 
                                        onRefresh={onRefresh}   
                                    />
                                }
                            >
                                <FlatList 
                                    horizontal={true}
                                    data={history}
                                    renderItem={renderItem}
                                    keyExtractor={(item)=>item.imgName}
                                />  
                            </ScrollView>        
                        )
                    ):(
                        <>
                            <FlatList 
                            refreshControl={
                                <RefreshControl 
                                    onRefresh={onRefresh}
                                />
                            }
                                data={[{number:1}]}
                                renderItem={()=><Empty>No items found!!</Empty>}
                                keyExtractor={(item)=>item.number}
                            />
                        </>
                    )
            )}
        </Container>
    )
}
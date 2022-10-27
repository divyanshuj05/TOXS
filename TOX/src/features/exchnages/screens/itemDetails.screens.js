import React, { useContext, useState, useEffect } from 'react'
import { TouchableOpacity, View, Alert } from 'react-native';
import styled from 'styled-components'
import { AuthenticationContext } from '../../../services/authentication/authentication.context';
import { ExchangeContext } from '../../../services/exchnage/exchange.context';
import { ActivityIndicator, Colors } from "react-native-paper";
import { ExchangeHistoryContext } from '../../../services/exchnage/historyExchnage.context';

const Container=styled.View`
    flex:1
    background-color:${props=>props.theme.background}
`;

const Scroll=styled.ScrollView`
    flex:0.99
`;

const Head=styled.Text`
    color:${props=>props.theme.text}
    text-align:center
    font-size: ${(props) => props.theme.fontSizes.h5};
    font-weight: ${(props) => props.theme.fontWeights.medium};
    font-family: ${props => props.theme.fonts.body};
    margin-vertical:${(props) => props.theme.space[4]};
`;

const ImageStyle=styled.Image`
    width:200px
    height:200px
    resize-mode:contain
    margin-left:${(props) => props.theme.space[3]};
    flex:0.65
`;

const Title=styled.Text`
    flex:0.35
    color:${props=>props.theme.text}
    margin-left:${(props) => props.theme.space[4]};
    font-size: ${(props) => props.theme.fontSizes.title};
    font-weight: ${(props) => props.theme.fontWeights.medium};
    font-family: ${props => props.theme.fonts.heading};
    marginTop:${(props) => props.theme.space[5]};
`;

const Desc=styled.Text`
    color:${props=>props.theme.text}
    font-size: ${(props) => props.theme.fontSizes.title};
    font-weight: ${(props) => props.theme.fontWeights.medium};
    margin-vertical:${(props) => props.theme.space[3]};
    margin-left:${(props) => props.theme.space[3]};
`;

const F1=styled.View`flex:0.4`;
const F2=styled.View`flex:0.6`;

const Row=styled.View`
    flex-direction:row
`;

const BottomBar = styled.View`
    background-color:${(props) => props.theme.colors.ui.basic};
    padding: ${(props) => props.theme.space[4]};
    border-radius: ${(props) => props.theme.space[2]};
    margin-horizontal: ${(props) => props.theme.space[2]};
`;

const Option=styled.Text`
    color:white
    text-align:center
    font-size: ${(props) => props.theme.fontSizes.title};
    font-family: ${props => props.theme.fonts.heading};
`;

const Error = styled.Text`
    margin-top:8px
    text-align:center 
    color:${props => props.theme.colors.ui.error}
`;

export const ItemDetails = ({ route,navigation }) => {

    const { details } = route.params
    const { get } = route.params
    const { user } = useContext(AuthenticationContext)
    const { isLoading, UpdateExchanges } = useContext(ExchangeContext)
    const { RetrieveMobile, detailsLoading, mobile } = useContext(ExchangeHistoryContext)

    const [error,setError]=useState(null)
    
    if(error)
    {
        setTimeout(()=>{
            setError(null)
        },5000)
    }

    var isSeller=(user.email==details.seller)
    var isBuyer=(user.email==details.buyer)

    useEffect(()=>{
        if(isSeller&&get==1){
            RetrieveMobile(details.buyer)
        }

        if(isBuyer&&get==1){
            RetrieveMobile(details.seller)
        }
    },[])
    

    const handleRemove = () => {
        Alert.alert(
            "Sure you want to remove item?",
            "Item will no be shown to other users for selling",
            [

                {
                    text: "Yes",
                    onPress: async () => { setError(await(UpdateExchanges(details,"Removed by seller",navigation))) }
                },
                {
                    text: "No",
                    onPress: () => { <></> }
                } 
            ]
        )
    }

    const handleBought = () => {
        Alert.alert(
            "Has the item been bought?",
            "Item will be removed from your holding list",
            [

                {
                    text: "Yes",
                    onPress: async() => { setError(await(UpdateExchanges(details,"Sold",navigation))) }
                },
                {
                    text: "No",
                    onPress: () => { <></> }
                }
            ]
        )
    }

    const handleHold = () => {
        Alert.alert(
            "Put the item on hold?",
            "Contact the seller to buy the product",
            [

                {
                    text: "Yes",
                    onPress: async () => { setError(await(UpdateExchanges(details,"On Hold",navigation))) }
                },
                {
                    text: "No",
                    onPress: () => { <></> }
                }
            ]
        )
    }

    const handleRelease = () => {
        Alert.alert(
            "Release the item?",
            "Item will be visible to other users",
            [

                {
                    text: "Yes",
                    onPress: async () => { setError(await(UpdateExchanges(details,"Available",navigation))) }
                },
                {
                    text: "No",
                    onPress: () => { <></> }
                }
            ]
        )
    }

    return(
        <Container>
                <Head>Details of Item</Head>
                {detailsLoading?
                (
                    <View style={{flex:1}}>
                        <ActivityIndicator size={50} color={Colors.red400} />
                    </View>
                ):
                (
                    <>
                        <Scroll>
                            <Row>
                                <ImageStyle source={{uri:details.imageURL}} />
                                <Title>{details.name}</Title>
                            </Row>
                            <Row>
                                <F1><Desc>Description: </Desc></F1>
                                <F2><Desc>{details.description}</Desc></F2>
                            </Row>
                            <Row>
                                <F1><Desc>Expected Cost: </Desc></F1>
                                <F2><Desc>₹{details.cost}</Desc></F2>
                            </Row>
                            <Row>
                                <F1><Desc>Category: </Desc></F1>
                                <F2><Desc>{details.category}</Desc></F2>
                            </Row>
                            <Row>
                                <F1><Desc>Status: </Desc></F1>
                                <F2><Desc>{details.status}</Desc></F2>
                            </Row>
                            {isSeller?
                                (
                                    details.buyer=="null"?
                                    (<></>):
                                    (
                                        <>
                                            <Row>
                                                <F1><Desc>Buyer Details: </Desc></F1>
                                                <F2><Desc>{details.buyer}</Desc></F2>
                                            </Row>
                                            <Row>
                                                <F1><Desc>Buyer Number: </Desc></F1>
                                                <F2><Desc>{mobile}</Desc></F2>
                                            </Row>
                                        </>
                                    )
                                ):
                                (<></>)
                            }
                            {isBuyer?
                            (
                                <>
                                    <Row>
                                        <F1><Desc>Seller Email: </Desc></F1>
                                        <F2><Desc>{details.seller}</Desc></F2>
                                    </Row>
                                    <Row>
                                        <F1><Desc>Seller Number: </Desc></F1>
                                        <F2><Desc>{mobile}</Desc></F2>
                                    </Row>
                                </>
                            ):
                            (<></>) 
                            }
                        </Scroll>
                        {details.status=="Available"||details.status=="On Hold"?
                (   
                    <BottomBar>
                        <View style={{flexDirection:"row"}}>
                            {isLoading?
                                (
                                    <View style={{flex:1}}>
                                        <ActivityIndicator size={20} color={Colors.blue300} />
                                    </View>
                                ):
                                (
                                    isSeller?
                                        (
                                            <TouchableOpacity style={{flex:1}} onPress={()=>handleRemove()}>
                                                <Option>Remove item?</Option>
                                            </TouchableOpacity>
                                        ):
                                        (
                                            isBuyer?
                                            (
                                                <>
                                                    <TouchableOpacity style={{flex:0.5}} onPress={()=>handleBought()}>
                                                        <Option>Already Bought?</Option>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity style={{flex:0.5}} onPress={()=>handleRelease()}>
                                                        <Option>Release item</Option>
                                                    </TouchableOpacity>
                                                </>
                                            ):
                                            (
                                                <TouchableOpacity style={{flex:1}} onPress={()=>handleHold()}>
                                                    <Option>Put on hold</Option>
                                                </TouchableOpacity>
                                            )
                                        )
                                )
                            }
                        </View>
                        {error?
                            (
                                <Error>{error}</Error>
                            ):(<></>)
                        }
                    </BottomBar>
                ):
                (<></>)
            }
                    </>
                )
                }
        </Container>
    )
}
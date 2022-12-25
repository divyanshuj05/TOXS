import React, { useContext, useState, useEffect } from 'react'
import { TouchableOpacity, View,Alert, ScrollView,Text, Image, Platform, Linking, FlatList, ActivityIndicator } from 'react-native';
import styled from 'styled-components'
import { AuthenticationContext } from '../../../services/authentication/authentication.context';
import { ExchangeContext } from '../../../services/exchnage/exchange.context';
import { ExchangeHistoryContext } from '../../../services/exchnage/historyExchnage.context';
import { DeviceOrientationContext } from '../../../services/common/deviceOrientation.context';
import { Ionicons, Fontisto } from '@expo/vector-icons';
import { AppThemeContext } from '../../../services/common/theme.context';
import { RadioButton } from "react-native-paper"

const Container=styled(View)`
    flex:1
    background-color:${props=>props.theme.background}
`;

const Scroll=styled(ScrollView)`
    flex:0.99
`;

const Head=styled(Text)`
    color:${props=>props.theme.text}
    text-align:center
    font-size: ${(props) => props.theme.fontSizes.h5};
    font-weight: ${(props) => props.theme.fontWeights.medium};
    font-family: ${props => props.theme.fonts.body};
    margin-vertical:${(props) => props.theme.space[3]};
`;

const ImageStylePot=styled(Image)`
    width:160px
    height:160px
    resize-mode:cover
    margin-left:${(props) => props.theme.space[3]};
    flex:0.65
    border-radius:${(props) => props.theme.space[3]};
`;

const ImageStyle=styled(Image)`
    width:225px
    height:225px
    margin-left:${(props) => props.theme.space[4]};
    margin-top:${(props) => props.theme.space[4]};
    border-radius:${(props) => props.theme.space[3]};
`;

const Title=styled(Text)`
    flex:0.35
    color:${props=>props.theme.text}
    margin-left:${(props) => props.theme.space[4]};
    font-size: ${(props) => props.theme.fontSizes.title};
    font-weight: ${(props) => props.theme.fontWeights.medium};
    font-family: ${props => props.theme.fonts.heading};
    marginTop:${(props) => props.theme.space[5]};
`;

const Desc=styled(Text)`
    color:${props=>props.theme.text}
    font-size: ${(props) => props.theme.fontSizes.title};
    font-weight: ${(props) => props.theme.fontWeights.medium};
    margin-vertical:${(props) => props.theme.space[3]};
    margin-left:${(props) => props.theme.space[3]};
`;

const ButtonText=styled(Text)`
    color:white
    font-size: ${(props) => props.theme.fontSizes.title};
    font-weight: ${(props) => props.theme.fontWeights.medium};
`;

const F1=styled(View)`flex:0.4`;
const F2=styled(View)`flex:0.6`;

const Row=styled(View)`
    flex-direction:row
`;

const BottomBar = styled(View)`
    background-color:${(props) => props.theme.colors.ui.basic};
    padding: 10px
    border-radius: ${(props) => props.theme.space[4]};
    margin-horizontal: ${(props) => props.theme.space[2]};
`;

const Button = styled(TouchableOpacity)`
    background-color:${(props) => props.theme.colors.ui.basic};
    padding: 4px
    border-radius: ${(props) => props.theme.space[4]};
    margin-left:${(props) => props.theme.space[3]};
    align-items:center;
    margin-vertical:${(props) => props.theme.space[3]};
    margin-right:${(props) => props.theme.space[2]};
`;

const Option=styled(Text)`
    color:white
    text-align:center
    font-size: ${(props) => props.theme.fontSizes.title};
    font-family: ${props => props.theme.fonts.heading};
`;

const Error = styled(Text)`
    margin-top:8px
    text-align:center 
    color:${props => props.theme.colors.ui.error}
`;

export const ItemDetails = ({ route,navigation }) => {

    const { details } = route.params
    const { get } = route.params
    const { user } = useContext(AuthenticationContext)
    const { isLoading, UpdateExchanges, Search, RetrieveBuyersDetails, Destroy } = useContext(ExchangeContext)
    const { RetrieveMobile, detailsLoading, mobile, UserData } = useContext(ExchangeHistoryContext)
    const { orientation, LockOrientation, UnlockOrientation } = useContext(DeviceOrientationContext)
    const { scheme } = useContext(AppThemeContext)
    const [isSold,setIsSold]=useState(false)
    const [soldTo,setSoldTo]=useState(null)
    const [error,setError]=useState(null)

    if(error)
    {
        setTimeout(()=>{
            setError(null)
        },5000)
    }
    var isSeller=(user.email==details.seller)
    var isBuyer=false
    for(let i=0;i<details.buyers.length;i++)
    {
        if(details.buyers[i]===user.email)
        {
            isBuyer=true
            break
        }
    }
    useEffect(()=>{
        LockOrientation()
        if(isSeller&&details.status==="On Hold"){
            RetrieveBuyersDetails(details.buyers)
        }
        if(isBuyer&&get==1){
            RetrieveMobile(details.seller)
        }
    },[])
    useEffect(()=>()=>{
        Destroy()
        UnlockOrientation()
    },[])
    const handleMobile = (phone) => {
        if(Platform.OS==="android")
        {
            Linking.openURL(`tel: ${phone}`)
        }
        else{
            Linking.openURL(`telprompt: ${phone}`)
        }
    }
    const handleMail = (mail) => {
        Linking.openURL(`mailto: ${mail}`)
    }
    const DetailsView = () => {
        return(
            <>
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
                    {details.status==="On Hold"?
                    (
                        <F2><Desc>{details.status} {isSeller||isBuyer?`(by ${details.buyers.length} users)`:null}</Desc></F2>
                    ):
                    (
                        <F2><Desc>{details.status}</Desc></F2>
                    )
                    }
                </Row>
                {isSeller?
                (
                    <>
                    <Row>
                        <F1><Desc>Posted on: </Desc></F1>
                        <F2><Desc>{details.postDate}</Desc></F2>
                    </Row>
                    <Row>
                        <F1><Desc>Post time: </Desc></F1>
                        <F2><Desc>{details.postTime}</Desc></F2>
                    </Row>
                    </>
                ):
                (
                    <></>
                )
                }
                {isSeller?
                    (
                        details.status=="On Hold"?
                        (   
                            <>
                                <Row>
                                    <F1><Desc>Buyers: </Desc></F1>
                                    <F2>
                                        <Button activeOpacity={0.65} onPress={()=>navigation.navigate("BuyersList",{details:details})}>
                                            <ButtonText>Check Buyers List</ButtonText>
                                        </Button>
                                    </F2>
                                </Row>
                            </>
                        ):
                        (
                            details.status=="Sold"?
                            (
                                <Row>
                                    <F1><Desc>Sold to</Desc></F1>

                                    <F2>
                                        <Desc>{details.buyer}</Desc>
                                    </F2>
                                </Row>
                            ):
                            (
                                <></>
                            )
                        )
                    ):
                    (<></>)
                }
                {isBuyer?
                (
                    <>
                        <Row>
                            <F1><Desc>Seller Email: </Desc></F1>
                            <F2>
                                <Desc>{details.seller}</Desc>
                                <TouchableOpacity activeOpacity={0.65} style={{flexDirection:"row"}} onPress={()=>handleMail(details.seller)}>
                                    <Desc></Desc>
                                    <Fontisto name="email" size={24} color={scheme=="dark"?"white":"#191919"} />
                                </TouchableOpacity>
                            </F2>
                        </Row>
                        <Row>
                            <F1><Desc>Seller's Number: </Desc></F1>
                            {detailsLoading?
                            (
                                <F2 style={{justifyContent:"center"}}>
                                    <ActivityIndicator color="purple" size={20} />
                                </F2>
                            ):
                            (
                                mobile==="Null"?
                                (
                                    <F2 style={{flexDirection:"row"}}>
                                        <Desc>Seller has disabled permission</Desc>
                                    </F2>
                                ):
                                (
                                    <F2 style={{flexDirection:"row"}}>
                                        <Desc>{mobile}</Desc>
                                        <TouchableOpacity activeOpacity={0.65} style={{marginLeft:48,marginVertical:16}} onPress={()=>handleMobile(mobile)}>
                                            <Ionicons name="call-outline" size={24} color={scheme=="dark"?"white":"#191919"} />
                                        </TouchableOpacity>
                                    </F2>
                                )
                            )
                            }
                        </Row>
                    </>
                ):
                (<></>) 
                }
            </>
        )
    }
    const BottomBarView = () => {
        return(
            <>
                {details.status=="Available"||details.status=="On Hold"?
                (   
                    <BottomBar>
                        <View style={{flexDirection:"row"}}>
                            {isLoading?
                                (
                                    <View style={{flex:1}}>
                                        <ActivityIndicator size={20} color="purple" />
                                    </View>
                                ):
                                (
                                    isSeller?
                                        (
                                                details.status=="On Hold"?
                                                (
                                                    <>
                                                    <TouchableOpacity activeOpacity={0.65} style={{flex:0.5}} onPress={()=>{setIsSold(!isSold)
                                                    }}>
                                                    <Option>Already Sold?</Option>
                                                    </TouchableOpacity>       
                                                    <TouchableOpacity activeOpacity={0.65} style={{flex:0.5}} onPress={()=>{
                                                        setIsSold(false)
                                                        Alert.alert(
                                                            "Sure you want to remove item?",
                                                            "Item will no be shown to other users for selling",
                                                            [
                                                    
                                                                {
                                                                    text: "Yes",
                                                                    onPress: async () => {  
                                                                        await UpdateExchanges(details,"Removed by seller",setError).then(res=>{
                                                                            Search()
                                                                            UserData()
                                                                            navigation.goBack()
                                                                        }).catch(e=>{
                                                                            console.log(e)
                                                                        })
                                                                    }
                                                                },
                                                                {
                                                                    text: "No",
                                                                    onPress: () => { <></> }
                                                                } 
                                                            ]
                                                        )
                                                        
                                                        }}>
                                                        <Option>Remove item?</Option>
                                                        </TouchableOpacity>
                                                        </>
                                                ):
                                                (
                                                    <TouchableOpacity activeOpacity={0.65} style={{flex:1}} onPress={()=>{
                                                        Alert.alert(
                                                            "Sure you want to remove item?",
                                                            "Item will no be shown to other users for selling",
                                                            [
                                                    
                                                                {
                                                                    text: "Yes",
                                                                    onPress: async () => { 
                                                                        await UpdateExchanges(details,"Removed by seller",setError).then(res=>{
                                                                            Search()
                                                                            UserData()
                                                                            navigation.goBack()
                                                                        }).catch(e=>{
                                                                            console.log(e)
                                                                        })
                                                                    }
                                                                },
                                                                {
                                                                    text: "No",
                                                                    onPress: () => { <></> }
                                                                } 
                                                            ]
                                                        )
                                                        }}>
                                                        <Option>Remove item?</Option>
                                                        </TouchableOpacity>
                                                )
                                        ):
                                        (
                                            isBuyer?
                                            (
                                                <TouchableOpacity activeOpacity={0.65} style={{flex:1}} onPress={()=>{
                                                    Alert.alert(
                                                        "Release the item?",
                                                        "Item will be visible to other users",
                                                        [                    
                                                            {
                                                                text: "Yes",
                                                                onPress: async () => { 
                                                                    await UpdateExchanges(details,"Available",setError).then(res=>{
                                                                        Search()
                                                                        UserData()
                                                                        navigation.goBack()
                                                                    }).catch(e=>{
                                                                        console.log(e)
                                                                    })
                                                                }
                                                            },
                                                            {
                                                                text: "No",
                                                                onPress: () => { <></> }
                                                            }
                                                        ]
                                                    )
                                                    }}>
                                                    <Option>Release item</Option>
                                                </TouchableOpacity>
                                            ):
                                            (
                                                <TouchableOpacity activeOpacity={0.65} style={{flex:1}} onPress={()=>{
                                                    Alert.alert(
                                                        "Put the item on hold?",
                                                        "Contact the seller to buy the product",
                                                        [
                                                
                                                            {
                                                                text: "Yes",
                                                                onPress: async () => { 
                                                                    await UpdateExchanges(details,"On Hold",setError).then(res=>{
                                                                        Search()
                                                                        UserData()
                                                                        navigation.goBack()
                                                                    }).catch(e=>{
                                                                        console.log(e)
                                                                    })
                                                                }
                                                            },
                                                            {
                                                                text: "No",
                                                                onPress: () => { <></> }
                                                            }
                                                        ]
                                                    )
                                                    }}>
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
    const renderItem = (item) => {
        return(
            <View style={{flexDirection:"row",alignContent:"center"}}>
                <RadioButton
                    status={item.item==soldTo?'checked':'unchecked'}
                    onPress={() => setSoldTo(item.item)}
                    color="rgb(100, 50, 150)"
                    uncheckedColor={scheme=="dark"?"white":"#191919"}
                />
                <ButtonText style={{marginTop:4,color:scheme=="dark"?"white":"#191919"}} onPress={()=>setSoldTo(item.item)}>{item.item}</ButtonText>
            </View>
        )
    }
    const SellerView = () => {
        return(
            <View style={{flex:0.5,borderWidth:1,borderColor:"rgb(150,150,150)",borderRadius:16}}>
                <Head style={{marginVertical:0}}>Sold to</Head>
                <FlatList 
                    data={details.buyers}
                    keyExtractor={(ele)=>ele}
                    renderItem={renderItem}
                />
                <View style={{flexDirection:"row",justifyContent:"center"}}>
                    <Button activeOpacity={0.65} onPress={()=>{setIsSold(false),setSoldTo(null)}} style={{flex:0.5,justifyContent:"center"}}>
                        <ButtonText>Close</ButtonText>
                    </Button>
                    <Button activeOpacity={0.65} style={{flex:0.5,justifyContent:"center"}} onPress={()=>{
                        Alert.alert(
                            "Has the item been bought?",
                            "Item will be removed from holding list",
                            [                    
                                {
                                    text: "Yes",
                                    onPress: async() => {
                                        setIsSold(false) 
                                        await UpdateExchanges(details,"Sold",soldTo,setError).then(res=>{
                                            Search()
                                            UserData()
                                            navigation.goBack()
                                        }).catch(e=>{
                                            console.log(e)
                                        })
                                    }
                                },
                                {
                                    text: "No",
                                    onPress: () => { <></> }
                                }
                            ]
                        )
                    }}>
                        <ButtonText>Submit</ButtonText>
                    </Button>
                </View>
            </View>
        )
    }
    if(orientation==1||orientation==2)
    {
        return(
            <Container>
                <Head>Details of Item</Head>
                <Scroll>
                    <Row>
                        <ImageStylePot source={{uri:details.imageURL}} />
                        <Title>{details.name}</Title>
                    </Row>
                    {DetailsView()}
                </Scroll>
                {isSold?
                (
                    SellerView()
                ):
                (
                    BottomBarView()
                )
                }
            </Container>
        )
    }
    else{
        return(
            <Container>
                <Row>
                    <View style={{flex:0.35}}>
                        {isSold?
                        (
                            <View style={{height:500,marginTop:32}}>
                                {SellerView()}
                            </View>
                        ):
                        (
                            <Scroll>
                                <ImageStyle source={{uri:details.imageURL}} />
                            </Scroll>
                        )
                        }
                    </View>
                    <View style={{flex:0.65}}>
                    <Head>Details of Item</Head>
                        <View style={{height:200}}>
                            <Scroll>
                                <Row>
                                    <F1><Desc>Item Name: </Desc></F1>
                                    <F2><Desc>{details.name}</Desc></F2>
                                </Row>
                                {DetailsView()}
                            </Scroll>
                        </View>
                    </View>
                </Row>
                {isSold?
                (
                    <></>
                ):
                (
                    BottomBarView()
                )
                }
            </Container>
        )
    }
}
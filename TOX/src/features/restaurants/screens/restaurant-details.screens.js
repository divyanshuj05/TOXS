import React, { useEffect, useContext, useState } from "react";
import { Alert, Text, View, Switch } from "react-native";
import styled from 'styled-components';
import { MenuList } from "../components/menu-list.components";
import { CartContext } from "../../../services/restaurant/cart.context";
import { ActivityIndicator, Colors } from "react-native-paper";
import { SafeArea } from "../../../utils/components/safe-area.components"
import { DeviceOrientationContext } from "../../../services/common/deviceOrientation.context";
import { RestaurantContext } from "../../../services/restaurant/restaurant-block.context";

const RestaurantText = styled(Text)`
  margin-top: ${(props) => props.theme.space[2]};
  text-align: center;
  color: ${(props) => props.theme.text};
  font-size: ${(props) => props.theme.fontSizes.h5};
  font-weight: ${(props) => props.theme.fontWeights.medium};
  font-family: ${(props) => props.theme.fonts.body};
`;

const ToggleText=styled(Text)`
    margin-top: ${(props) => props.theme.space[3]};
    margin-horizontal: ${(props) => props.theme.space[2]};
    color: ${(props) => props.theme.text};
    font-size: ${(props) => props.theme.fontSizes.body};
    font-weight: ${(props) => props.theme.fontWeights.medium};
    font-family: ${(props) => props.theme.fonts.heading};
`;

const IndicatorView=styled(View)`
    margin-top: ${(props) => props.theme.space[5]};
`; 

const Container = styled(View)`
    flex:1
    background-color:${(props) => props.theme.background};
`;

const EmptyList=styled(Text)`
    margin-top: ${(props) => props.theme.space[5]};
    text-align: center;
    color: ${(props) => props.theme.text};
    font-size: ${(props) => props.theme.fontSizes.title};
    font-weight: ${(props) => props.theme.fontWeights.regular};
    font-family: ${(props) => props.theme.fonts.body};
`;

export const RestaurantDetails = ({ route, navigation }) => {
    const { restaurent } = route.params;
    const { tag } = route.params
    const { restaurants, paymentDone, setPaymentDone }=useContext(RestaurantContext)
    const { destroy, removeItems } = useContext(CartContext);
    const { LockOrientation, UnlockOrientation, orientation } = useContext(DeviceOrientationContext)
    const [restaurantMenuList, setRestaurantMenuList] = useState([]) 
    const [toggleEnabled,setToggleEnabled]=useState(false)
    const [foodType,setFoodType]=useState("Veg")

    useEffect(() => {
        navigation.addListener('beforeRemove', (block) => {
            block.preventDefault();
            if(paymentDone)
            {
                navigation.dispatch(block.data.action)
                return
            }
            Alert.alert(
                "Discard cart?",
                "Any changes will be discarded",
                [

                    {
                        text: "Yes",
                        onPress: async() => { await destroy().then(res=>{
                            navigation.dispatch(block.data.action)
                            return
                        }).catch(e=>{
                            alert("Some error occured")
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
        })
    }, [navigation])

    function compare(a,b){
        if(a.title>b.title) return 1;
        else if(a.title<b.title) return -1
        else return 0
    }

    useEffect(()=>{
        setFoodType("Veg and Non Veg")
        setToggleEnabled(false)
        LockOrientation()
        restaurants.forEach(element => {
            if(element.Name==restaurent)
            {
                if(element.menuList!=undefined)
                {
                    element.menuList.sort(compare)
                }
                setRestaurantMenuList(element)
            }
        });
        destroy()
        setPaymentDone(false)
    },[])

    useEffect(()=>()=>{
        UnlockOrientation()
    },[])

    const toggleHandler = () => {
        if(toggleEnabled==false)
        {
            removeItems()
            setToggleEnabled(!toggleEnabled)
            setFoodType(foodType=="Veg and Non Veg"?"Veg Only":"Veg and Non Veg")
        }
        else{
            setToggleEnabled(!toggleEnabled)
            setFoodType(foodType=="Veg and Non Veg"?"Veg Only":"Veg and Non Veg")
        }
    }

    return (
        <Container>
            {restaurantMenuList==[]?
            (
                <IndicatorView>
                    <ActivityIndicator color={Colors.red400} size={50} />
                </IndicatorView>
            ):
            (
                tag==1?
                (
                    <SafeArea>
                        <RestaurantText>{restaurent}</RestaurantText>
                        {!restaurantMenuList.menuList||restaurantMenuList.menuList==[]?
                        (
                            <EmptyList>No Menu List!!</EmptyList>
                        ):
                        (
                            <>
                                <View style={{flexDirection:"row",marginLeft:orientation==1||orientation==2?16:240}}>
                                    <Switch
                                        trackColor={{ true: "#004900", false: "#555555" }}
                                        thumbColor={toggleEnabled ? "#007900":"#AAAAAA"}
                                        onValueChange={toggleHandler}
                                        value={toggleEnabled}
                                    />
                                    <ToggleText>{foodType}</ToggleText>
                                </View>
                                <MenuList 
                                    data={restaurantMenuList.menuList} 
                                    navigation={navigation} restaurant={restaurent} 
                                    vendor={restaurantMenuList.vendor} type={foodType}
                                />
                            </>
                        )
                        }
                    </SafeArea>
                ):
                (
                    <>
                        <RestaurantText>{restaurent}</RestaurantText>
                        
                        {!restaurantMenuList.menuList||restaurantMenuList.menuList==[]?
                        (
                            <EmptyList>No Menu List!!</EmptyList>
                        ):
                        (
                            <>
                                <View style={{flexDirection:"row",marginLeft:orientation==1||orientation==2?16:240}}>
                                <Switch
                                    trackColor={{ true: "#004900", false: "#555555" }}
                                    thumbColor={toggleEnabled ? "#007900":"#AAAAAA"}
                                    onValueChange={toggleHandler}
                                    value={toggleEnabled}
                                />
                                <ToggleText>{foodType}</ToggleText>
                                </View>
                                <MenuList 
                                    data={restaurantMenuList.menuList} 
                                    navigation={navigation} restaurant={restaurent} 
                                    vendor={restaurantMenuList.vendor} type={foodType}
                                />
                            </>
                        )
                        }   
                    </>
                )
            )}
        </Container>
    )
};
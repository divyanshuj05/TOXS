import React, { useEffect, useContext, useState } from "react";
import { Alert, Text, View } from "react-native";
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
    const { restaurants }=useContext(RestaurantContext)
    const { destroy } = useContext(CartContext);
    const { LockOrientation, UnlockOrientation } = useContext(DeviceOrientationContext)
    const [restaurantMenuList, setRestaurantMenuList] = useState([]) 

    useEffect(() => {
        navigation.addListener('beforeRemove', (block) => {
            block.preventDefault();
            Alert.alert(
                "Discard cart?",
                "Any changes will be discarded",
                [

                    {
                        text: "Yes",
                        onPress: () => { navigation.dispatch(block.data.action), destroy() }
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
    },[])

    useEffect(()=>()=>{
        UnlockOrientation()
    },[])

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
                            <MenuList data={restaurantMenuList.menuList} navigation={navigation} restaurant={restaurent} vendor={restaurantMenuList.vendor}/>
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
                            <MenuList data={restaurantMenuList.menuList} navigation={navigation} restaurant={restaurent} vendor={restaurantMenuList.vendor}/>
                        )
                        }   
                    </>
                )
            )}
        </Container>
    )
};
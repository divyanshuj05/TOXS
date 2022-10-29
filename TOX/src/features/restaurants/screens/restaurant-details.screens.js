import React, { useEffect, useContext } from "react";
import { Alert } from "react-native";
import styled from 'styled-components';
import { MenuList } from "../components/menu-list.components";
import { CartContext } from "../../../services/restaurant/cart.context";
import { MenuListContext } from "../../../services/restaurant/menu-list.context";
import { ActivityIndicator, Colors } from "react-native-paper";
import { SafeArea } from "../../../utils/components/safe-area.components"
import { DeviceOrientationContext } from "../../../services/common/deviceOrientation.context";

const RestaurantText = styled.Text`
  margin-top: ${(props) => props.theme.space[2]};
  text-align: center;
  color: ${(props) => props.theme.text};
  font-size: ${(props) => props.theme.fontSizes.h5};
  font-weight: ${(props) => props.theme.fontWeights.medium};
  font-family: ${(props) => props.theme.fonts.body};
`;

const IndicatorView=styled.View`
    margin-top: ${(props) => props.theme.space[5]};
`; 

const Container = styled.View`
    flex:1
    background-color:${(props) => props.theme.background};
`;

const EmptyList=styled.Text`
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

    const { destroy } = useContext(CartContext);
    const { LockOrientation, UnlockOrientation } = useContext(DeviceOrientationContext)
    const { restaurantMenuList, isLoading, isError, Search } = useContext(MenuListContext)

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
    
    useEffect(()=>{
        LockOrientation()
        Search(restaurent)
        destroy()
    },[])

    useEffect(()=>()=>{
        UnlockOrientation()
    },[])

    /*const flatlistData = [
        {
            title: "Cold Drink",
            price: 10,
            notAdded: true
        },
        {
            title: "Chips",
            price: 10,
            notAdded: true
        },
        {
            title: "Pizza",
            price: 80,
            notAdded: true
        },
        {
            title: "Patties",
            price: 25,
            notAdded: true
        },
        {
            title: "Sandwich",
            price: 30,
            notAdded: true
        },
    ];*/

    return (
        <Container>
            {isLoading?
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
                        {!restaurantMenuList?
                        (
                            <EmptyList>No Menu List!!</EmptyList>
                        ):
                        (
                            <MenuList data={restaurantMenuList} navigation={navigation} />
                        )
                        }
                    </SafeArea>
                ):
                (
                    <>
                        <RestaurantText>{restaurent}</RestaurantText>
                        {!restaurantMenuList?
                        (
                            <EmptyList>No Menu List!!</EmptyList>
                        ):
                        (
                            <MenuList data={restaurantMenuList} navigation={navigation} />
                        )
                        }   
                    </>
                )
                
            )}
        </Container>
    )
};
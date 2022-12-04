import React, { useState, useContext, useEffect } from 'react'
import { View,TouchableOpacity, Text, Alert, Switch } from "react-native"
import styled from 'styled-components'
import { TextInput } from 'react-native-paper'
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { AppThemeContext } from '../../../services/common/theme.context';
import { VendorRestaurantContext } from '../../../services/restaurant/vendorRestaurant.context';

const ListView = styled(View)`
    font-family:${(props) => props.theme.fonts.body};
    font-size: ${(props) => props.theme.fontSizes.body};
    padding-vertical:${(props) => props.theme.space[3]};
    margin-vertical:4px
`;

const ListTitle = styled(Text)`
    margin-left:${(props) => props.theme.space[1]};
    padding-right:${(props) => props.theme.space[6]};
    font-family:${(props) => props.theme.fonts.heading};
    color:${(props) => props.theme.text};
`;

const ListPrice = styled(Text)`
    padding-horizontal:20px;
    font-family:${(props) => props.theme.fonts.heading};
    padding-top:${(props) => props.theme.space[2]};
    color:${(props) => props.theme.text};
`;

const Touch=styled(TouchableOpacity)`
    margin-left:${(props) => props.theme.space[4]};
    justify-content:center;
`;

const Input=styled(TextInput)`
    height:22px;
    width:120px;
    padding:8px
`;

const Error=styled(Text)`
    margin-left:${(props) => props.theme.space[3]}; 
    color:${props => props.theme.colors.ui.error}
`;

const Veg=styled(View)`
    background-color:#007900;
    border-radius:128px;
    padding:4px;
`;

const NonVeg=styled(View)`
    background-color:#990000;
    border-radius:128px;
    padding:4px;
`;

export const VendorMenuDetail= ({ foodItem,Restaurant, oriTag }) => {

    const [edit,setEdit]=useState(false)
    const [cost,setCost]=useState("")
    const [error,setError]=useState(null)
    const [checked,setChecked]=useState(foodItem.isPresent)
    const { scheme } = useContext(AppThemeContext)
    const { editItem,deleteItem,changeItemVisibility } = useContext(VendorRestaurantContext)

    useEffect(()=>{
        setChecked(foodItem.isPresent)
    },[foodItem.isPresent])

    const deleteButton = () => {
            Alert.alert(
                "Delete Item?",
                `${foodItem.title} will be deleted`,
                [
                    {
                        text: "Yes",
                        onPress: async () => {setError(await (deleteItem(foodItem.title,foodItem.price,foodItem.type,foodItem.isPresent,Restaurant))) }
                    },
                    {
                        text: "No",
                        onPress: () => { <></> }
                    }
                ]
            )
    }

    if(!!error)
    {
        setTimeout(()=>{setError(null)},5000)
    }

    const toggleSwitch = async() => {
        if(checked==true)
        {
            setError(await(changeItemVisibility(foodItem,false,Restaurant)))
        }else{
            setError(await(changeItemVisibility(foodItem,true,Restaurant)))
        }
    }

    const MenuListView = () => {
        return(
            <ListView>
                <View style={{flexDirection:"row"}}>
                    <View style={{marginLeft:8,justifyContent:"center"}}>
                        {foodItem.type=="Veg"?
                            (
                                <Veg></Veg>
                            ):
                            (
                                <NonVeg></NonVeg>
                            )
                        }
                    </View>
                    <View style={{flex:0.9}}>
                        <ListTitle>
                            {foodItem.title}
                        </ListTitle></View>
                    </View>
                <View style={{flexDirection:"row"}}>
                    <View style={{flex:0.4}}>
                        <ListPrice>
                            ₹{foodItem.price}
                        </ListPrice>
                    </View>
                    {edit?
                    (
                        <View style={{flexDirection:"row",flex:0.4,marginTop:-24}}>
                            <Input
                                mode='outlined'
                                label="Item Cost"
                                textContentType="telephoneNumber"
                                keyboardType="phone-pad"
                                autoCapitalize="none"
                                onChangeText={(text) => setCost(text)}
                            /> 
                            <Touch activeOpacity={0.65} onPress={async()=>{
                                setEdit(!edit)
                                setError(await (editItem(foodItem.title,foodItem.price,foodItem.type,foodItem.isPresent,cost,Restaurant)))
                                setCost("")
                            }}>
                                <Ionicons name="checkmark-circle-outline" size={26} color={scheme == "light" ? "black" : "white"} />
                            </Touch>
                        </View>
                    ):
                    (
                        <>
                            <View style={{flex:0.22,alignItems:"center",marginTop:-25}}>
                                <Switch
                                    style={{margin:0}}
                                    trackColor={{ false: "#641212", true: "#126412" }}
                                    thumbColor={checked ? "green" : "red"}
                                    ios_backgroundColor="#3e3e3e"
                                    onValueChange={toggleSwitch}
                                    value={checked}
                                />
                            </View>
                            <View style={{flex:0.17,alignItems:"center"}}>
                                <TouchableOpacity activeOpacity={0.65} onPress={()=>setEdit(!edit)}>
                                    <MaterialIcons name="edit" size={22} color={scheme == "light" ? "black" : "white"} />
                                </TouchableOpacity>
                            </View>
                            <View style={{flex:0.17,alignItems:"center"}}>
                                <TouchableOpacity activeOpacity={0.65} onPress={()=>deleteButton()}>
                                    <MaterialIcons name="delete" size={22} color={scheme == "light" ? "black" : "white"} />
                                </TouchableOpacity>
                            </View>
                        </>
                    )
                    }
                </View>
                {!!error?
                (
                    <Error>{error}</Error>
                ):(<></>)
                }
            </ListView>
        )
    }

    if(oriTag==0)
    {
        return(
            <>
                {MenuListView()}
            </>
        )
    }
    return(
        <View style={{alignContent:"center",marginLeft:128}}>
            {MenuListView()}
        </View>
    )
}
import React, { useState, useContext } from 'react'
import { View,TouchableOpacity, Text, Alert } from "react-native"
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
    margin-bottom:${(props) => props.theme.space[2]};
`;

const ListTitle = styled(Text)`
    padding-left:${(props) => props.theme.space[3]};
    padding-right:${(props) => props.theme.space[6]};
    font-family:${(props) => props.theme.fonts.heading};
    color:${(props) => props.theme.text};
`;

const ListPrice = styled(Text)`
    padding-horizontal:${(props) => props.theme.space[3]};
    font-family:${(props) => props.theme.fonts.heading};
    padding-top:${(props) => props.theme.space[2]};
    color:${(props) => props.theme.text};
`;

const Touch=styled.TouchableOpacity`
    margin-left:${(props) => props.theme.space[2]};
    margin-top:${(props) => props.theme.space[2]};
`;

const Input=styled(TextInput)`
    height:50px;
    width:100px;
`;

const Error=styled(Text)`
    margin-left:${(props) => props.theme.space[3]}; 
    color:${props => props.theme.colors.ui.error}
`;

export const VendorMenuDetail= ({ foodItem,Restaurant }) => {

    const [edit,setEdit]=useState(false)
    const [cost,setCost]=useState("")
    const [error,setError]=useState(null)

    const { scheme } = useContext(AppThemeContext)
    const { editItem,deleteItem } = useContext(VendorRestaurantContext)

    const deleteButton = () => {
            Alert.alert(
                "Delete Item?",
                `${foodItem.title} will be deleted`,
                [
                    {
                        text: "Yes",
                        onPress: async () => {setError(await (deleteItem(foodItem.title,foodItem.price,Restaurant))) }
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

    return(
        <ListView>
                <View style={{flexDirection:"row"}}>
                    <View style={{flex:0.6}}>
                    <ListTitle>
                        {foodItem.title}
                    </ListTitle></View>
                    <View style={{flex:0.4, flexDirection:"row"}}>
                        {edit?
                        (
                            <View style={{flexDirection:"row"}}>
                                    <Input
                                        label="Item Cost"
                                        textContentType="telephoneNumber"
                                        keyboardType="phone-pad"
                                        autoCapitalize="none"
                                        onChangeText={(text) => setCost(text)} /> 
                                    <Touch onPress={async()=>{
                                        setEdit(!edit)
                                        setError(await (editItem(foodItem.title,foodItem.price,cost,Restaurant)))
                                        }}>
                                        <Ionicons name="checkmark-circle-outline" size={26} color={scheme == "light" ? "black" : "white"} />
                                    </Touch>
                            </View>
                        ):
                        (
                            <>
                                <TouchableOpacity onPress={()=>setEdit(!edit)}>
                                    <MaterialIcons name="edit" size={22} color={scheme == "light" ? "black" : "white"} />
                                </TouchableOpacity>
                                <TouchableOpacity style={{marginLeft:64}} onPress={()=>deleteButton()}>
                                    <MaterialIcons name="delete" size={22} color={scheme == "light" ? "black" : "white"} />
                                </TouchableOpacity>
                            </>
                        )
                        }
                    </View>
                </View>
                <ListPrice>
                    ₹{foodItem.price}
                </ListPrice>
                {!!error?
                (
                    <Error>{error}</Error>
                ):(<></>)

                }
            </ListView>
    )
}
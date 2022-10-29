import React, { useState, useContext } from 'react';
import { View,ScrollView,StyleSheet,TouchableOpacity,Image, DeviceEventEmitter } from "react-native"
import { TextInput } from "react-native-paper"
import styled from 'styled-components';
import { Dropdown } from 'react-native-element-dropdown';
import { ExchangeContext } from '../../../services/exchnage/exchange.context';
import * as ImagePicker from "expo-image-picker"
import { ActivityIndicator, Colors } from "react-native-paper";
import { DeviceOrientationContext } from '../../../services/common/deviceOrientation.context';
import { Alert } from 'react-native'

const Wrapper = styled(View)`
    flex:1;
    background-color:${(props) => props.theme.background};
`;

const Head=styled.Text`
    text-align:center
    color:${props=>props.theme.text}
    margin-vertical:${props=>props.theme.space[4]}
    font-family:${props=>props.theme.fonts.body}
    font-size:${props=>props.theme.fontSizes.h5}
`;

const HeadLand=styled.Text`
    text-align:center
    color:${props=>props.theme.text}
    margin-vertical:${props=>props.theme.space[3]}
    font-family:${props=>props.theme.fonts.body}
    font-size:${props=>props.theme.fontSizes.h5}
`;

const Item=styled.Text`
    padding-horizontal:28px;
    color:${props=>props.theme.text}
    font-size:${props=>props.theme.fontSizes.title}
    flex:0.7
`;

const Row=styled.View`
    flex-direction:row
    margin-bottom: 50px;
`;

const Input=styled(TextInput)`
    height:36px;
    width: 150px;
`;

const DropDownView=styled.View`
    background-color:rgb(230,230,230)
`;

const Photo=styled.Text`
    color:rgb(230,230,230)
    border-radius:${props=>props.theme.space[2]}
    background-color:${props=>props.theme.colors.ui.basic}
    padding-horizontal:40px
    padding-vertical:${props=>props.theme.space[3]}
    font-family:${props=>props.theme.fonts.heading}
    font-size:${props=>props.theme.fontSizes.body}
`;

const Error = styled.Text`
    margin-left:${(props) => props.theme.space[4]}; 
    color:${props => props.theme.colors.ui.error}
`;

const Cancel = styled.Text`
    text-align:center;
    font-size: 16px;
    padding:12px;
    font-family:${(props) => props.theme.fonts.heading};
    font-weight:${(props) => props.theme.fontWeights.bold};
    color:${(props) => props.theme.colors.bg.primary};
    background-color:${(props) => props.theme.colors.ui.error};
`;

const Submit = styled.Text`
    text-align:center;
    font-size: 16px;
    padding:12px;
    font-family:${(props) => props.theme.fonts.heading};
    font-weight:${(props) => props.theme.fontWeights.bold};
    color:${(props) => props.theme.colors.bg.primary};
    background-color:${(props) => props.theme.colors.ui.success};
`;

export const SellScreen = ({ navigation }) => {

    const [item,setItem]=useState("")
    const [desc,setDesc]=useState("")
    const [price,setPrice]=useState("")
    const [category,setCategory]=useState("")
    const [image,setImage]=useState(null)
    const [error,setError]=useState(null)

    const { addItem,isLoading } = useContext(ExchangeContext)
    const { orientation } = useContext(DeviceOrientationContext)

    const imageHandler =async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          });
      
          if (!result.cancelled) {
            if(result.type!="image") setError("Only images are allowed")
            else setImage(result);
          }
    }

    if(error!=null)
    {
        Alert.alert(
            "Error!!",
            `${error}`,
            [

                {
                    text: "Ok",
                    onPress: () => { <></> }
                }
            ]
            )
        setTimeout(()=>{
            setError(null)
        },500)
    }

    const data=[
    { label: 'Lab Coat', value: 'Lab Coat' },
    { label: 'Books', value: 'Books' },
    { label: 'Drafters', value: 'Drafters' },
    { label: 'Misc', value: 'Misc' }
    ]

    return (
        <Wrapper>
            {orientation==1||orientation==2?
            (
                <Head>Submit Details of item</Head>
            ):
            (
                <HeadLand>Submit Details of item</HeadLand>
            )
            }
            {isLoading?
            (
                <View style={{ marginTop: 50 }}>
                    <ActivityIndicator color={Colors.red400} size={50} />
                </View>
            ):
            (
                <>
                    <ScrollView style={{flex:0.92}}>
                        <Row>
                            <Item>Name of item </Item>
                            <Input placeholder='Name' onChangeText={(text)=>setItem(text)} keyboardType="default" />
                        </Row>
                        <Row>
                            <Item>Description of item</Item>
                            <Input placeholder='Within 200 characters' onChangeText={(text)=>setDesc(text)} keyboardType="default" />
                        </Row>
                        <Row>
                            <Item>Category</Item>
                            <DropDownView>
                                <Dropdown style={styles.dropdown}
                                    data={data}
                                    placeholderStyle={styles.placeholderStyle}
                                    selectedTextStyle={styles.selectedTextStyle}
                                    iconStyle={styles.iconStyle}
                                    value={category}
                                    onChange={item=>setCategory(item)}
                                    placeholder="Select Category"
                                    valueField="value"
                                    labelField="label"
                                />
                            </DropDownView>
                        </Row>
                        <Row>
                            <Item>Expected Price of item</Item>
                            <Input placeholder='Price' onChangeText={(text)=>setPrice(text)} keyboardType="number-pad" />
                        </Row>
                        <Row>
                            <Item>Select Image</Item>
                            <TouchableOpacity onPress={()=>imageHandler()}>
                                <Photo>Add Photo</Photo>
                            </TouchableOpacity>
                        </Row>
                        {image?
                        (<Image style={{flex: 1,
                            width: 128,
                            height: 128,
                            resizeMode: 'contain',marginLeft:28}} source={{uri:image.uri}} />):(<></>)
                        }
                        {error?
                        (
                            <Error>{error}</Error>
                        ):
                        (<></>)
                        }
                    </ScrollView>
                    <View style={{ flexDirection: "row" }}>
                        <TouchableOpacity style={{ flex: 0.5, justifyContent: 'center' }} onPress={() => { navigation.goBack() }}>
                            <Cancel>Cancel</Cancel>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ flex: 0.5, justifyContent: 'center' }} onPress={async() => { 
                            setError(await (addItem(item,desc,price,category.label,image,navigation))) 
                        }}>
                            <Submit>Submit</Submit>
                        </TouchableOpacity>
                    </View>
                </>
            )}
        </Wrapper>
    )
}

const styles = StyleSheet.create({
    dropdown: {
        margin: 12,
        height: 20,
        width: 125,
    },
    placeholderStyle: {
        fontSize: 16,
        color: "rgb(100,100,100)"
    },
    selectedTextStyle: {
        fontSize: 16,
        color: "rgb(100,100,100)"
    }
});
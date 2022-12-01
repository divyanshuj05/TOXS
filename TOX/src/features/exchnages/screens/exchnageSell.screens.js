import React, { useState, useContext } from 'react';
import { View,ScrollView,StyleSheet,TouchableOpacity,Image, Text } from "react-native"
import { TextInput } from "react-native-paper"
import styled from 'styled-components';
import { Dropdown } from 'react-native-element-dropdown';
import { ExchangeContext } from '../../../services/exchnage/exchange.context';
import * as ImagePicker from "expo-image-picker"
import { ActivityIndicator, Colors } from "react-native-paper";
import { DeviceOrientationContext } from '../../../services/common/deviceOrientation.context';
import { Alert } from 'react-native'
import { ExchangeHistoryContext } from '../../../services/exchnage/historyExchnage.context';

const Wrapper = styled(View)`
    flex:1;
    background-color:${(props) => props.theme.background};
`;

const Head=styled(Text)`
    text-align:center
    color:${props=>props.theme.text}
    margin-vertical:${props=>props.theme.space[4]}
    font-family:${props=>props.theme.fonts.body}
    font-size:${props=>props.theme.fontSizes.h5}
`;

const HeadLand=styled(Text)`
    text-align:center
    color:${props=>props.theme.text}
    margin-vertical:${props=>props.theme.space[3]}
    font-family:${props=>props.theme.fonts.body}
    font-size:${props=>props.theme.fontSizes.h5}
`;

const Item=styled(Text)`
    padding-horizontal:28px;
    color:${props=>props.theme.text}
    font-size:${props=>props.theme.fontSizes.title}
    flex:0.7
`;

const Row=styled(View)`
    flex-direction:row
    margin-bottom: 50px;
`;

const Input=styled(TextInput)`
    height:36px;
    width: 150px;
`;

const DropDownView=styled(View)`
    background-color:rgb(230,230,230)
`;

const Photo=styled(Text)`
    color:rgb(230,230,230)
    background-color:${props=>props.theme.colors.ui.basic}
    padding-horizontal:12px
    padding-vertical:12px
    font-family:${props=>props.theme.fonts.heading}
    font-size:${props=>props.theme.fontSizes.body}
    border-color:white
`;

const RemoveText=styled(Text)`
    color:rgb(230,230,230)
    background-color:${props=>props.theme.colors.ui.basic}
    padding-horizontal:12px
    padding-vertical:12px
    font-family:${props=>props.theme.fonts.heading}
    font-size:${props=>props.theme.fontSizes.body}
`; 

const Error = styled(Text)`
    margin-left:${(props) => props.theme.space[4]}; 
    color:${props => props.theme.colors.ui.error}
`;

const Cancel = styled(Text)`
    text-align:center;
    font-size: 16px;
    padding:10px;
    font-family:${(props) => props.theme.fonts.heading};
    font-weight:${(props) => props.theme.fontWeights.bold};
    color:${(props) => props.theme.colors.bg.primary};
    background-color:${(props) => props.theme.colors.ui.error};
    border-top-left-radius:32px
    border-bottom-left-radius:32px
`;

const Submit = styled(Text)`
    text-align:center;
    font-size: 16px;
    padding:10px;
    font-family:${(props) => props.theme.fonts.heading};
    font-weight:${(props) => props.theme.fontWeights.bold};
    color:${(props) => props.theme.colors.bg.primary};
    background-color:${(props) => props.theme.colors.ui.success};
    border-top-right-radius:32px
    border-bottom-right-radius:32px
`;

export const SellScreen = ({ navigation }) => {

    const [item,setItem]=useState("")
    const [desc,setDesc]=useState("")
    const [price,setPrice]=useState("")
    const [category,setCategory]=useState("")
    const [image,setImage]=useState(null)
    const [error,setError]=useState(null)
    const { addItem,isLoading, Search } = useContext(ExchangeContext)
    const { UserData } = useContext(ExchangeHistoryContext)
    const { orientation } = useContext(DeviceOrientationContext)

    const libraryImageHandler =async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
            alert("You've refused to allow this app to access your library!");
            return;
        }
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

    const cameraImagehandler = async() => {
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
        if (permissionResult.granted === false) {
          alert("You've refused to allow this app to access your camera!");
          return;
        }
        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.cancelled) {
            if(result==null) alert("Some error occured! Please try again")
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
    { label: 'Cycle', value: 'Cycle' },
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
                    <ScrollView style={{flex:0.92}} keyboardShouldPersistTaps={'handled'}>
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
                                    containerStyle={{ backgroundColor:"rgb(230,230,230)",borderRadius:16 }}
                                    activeColor={{color:"rgb(190,190,190)"}}
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
                            <View style={{marginLeft:32,flexDirection:"row"}}>
                                <TouchableOpacity activeOpacity={0.65} onPress={()=>cameraImagehandler()}>
                                    <Photo style={{borderTopLeftRadius:16,borderBottomLeftRadius:16,borderRightWidth:1}}>Camera</Photo>
                                </TouchableOpacity>
                                <TouchableOpacity activeOpacity={0.65} onPress={()=>libraryImageHandler()}>
                                    <Photo style={{borderTopRightRadius:16,borderBottomRightRadius:16,borderLeftWidth:1}}>From Library</Photo>
                                </TouchableOpacity>
                            </View>
                        </Row>
                        {image?
                        (
                            <View style={{flexDirection:"row"}}>
                                <Image style={{flex: 0.7,
                                    width: 150,
                                    height: 150,
                                    resizeMode:"contain",
                                    marginLeft:28
                                }} 
                                source={{uri:image.uri}} 
                            />
                            <TouchableOpacity activeOpacity={0.65} style={{justifyContent:"center",marginLeft:28}} onPress={()=>setImage(null)}>
                                <Photo style={{borderRadius:16}}>Remove</Photo>
                            </TouchableOpacity>
                            </View>
                        ):
                        (<></>)
                        }
                        {error?
                        (
                            <Error>{error}</Error>
                        ):
                        (<></>)
                        }
                    </ScrollView>
                    <View style={{ flexDirection: "row" }}>
                        <TouchableOpacity activeOpacity={0.65} style={{ flex: 0.5, justifyContent: 'center' }} onPress={() => { navigation.goBack() }}>
                            <Cancel>Cancel</Cancel>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.65} style={{ flex: 0.5, justifyContent: 'center' }} onPress={async() => { 
                            await addItem(item,desc,price,category.label,image,setError).then(res=>{
                                Search()
                                UserData()
                                navigation.goBack()
                            }).catch(e=>{
                            })
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
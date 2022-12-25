import React, {useState ,useContext,useEffect} from "react";
import { FlatList,View, TouchableOpacity, Text, ScrollView, ActivityIndicator } from "react-native";
import styled from 'styled-components';
import { TextInput } from "react-native-paper";
import { Ionicons } from '@expo/vector-icons';
import { VendorMenuDetail } from "../components/vendorMenuDetails.components";
import { VendorRestaurantContext } from "../../../services/restaurant/vendorRestaurant.context";
import { DeviceOrientationContext } from "../../../services/common/deviceOrientation.context";
import { RadioButton } from 'react-native-paper';
import { AppThemeContext } from "../../../services/common/theme.context";

const RestaurantText = styled(Text)`
  margin-top: ${(props) => props.theme.space[2]};
  text-align: center;
  color: ${(props) => props.theme.text};
  font-size: ${(props) => props.theme.fontSizes.h5};
  font-weight: ${(props) => props.theme.fontWeights.medium};
  font-family: ${(props) => props.theme.fonts.body};
`;

const Scroll = styled(ScrollView)`
    padding-top:${(props) => props.theme.space[3]};
    padding-left:${(props) => props.theme.space[1]};
    padding-right:${(props) => props.theme.space[1]};
    flex:1
`;

const Container = styled(View)`
    flex:1
    background-color:${(props) => props.theme.background};
`;

const BottomBar = styled(View)`
    background-color:${(props) => props.theme.colors.ui.basic};
    flex-direction:row
    padding-horizontal: ${(props) => props.theme.space[2]};
    padding-vertical: ${(props) => props.theme.space[3]};
    border-radius: ${(props) => props.theme.space[4]};
    margin-horizontal: ${(props) => props.theme.space[2]};
    margin-bottom:${(props) => props.theme.space[2]};
`;

const AddText=styled(Text)`
    color:${(props) => props.theme.colors.bg.primary};
    font-size:18px;
    text-align:center
    font-family:${(props) => props.theme.fonts.heading};
`;

const Error=styled(Text)`
    color:${props => props.theme.colors.ui.error}
    font-size:16px;
    font-family:${(props) => props.theme.fonts.heading};
`;

const Add=styled(Text)`
    color:${(props) => props.theme.text};
    font-size:14px;
    font-family:${(props) => props.theme.fonts.heading};
`;

const Input=styled(TextInput)`
    height:50px;
    width:128px;
`;

const Touch=styled(TouchableOpacity)`
    margin-left:${(props) => props.theme.space[4]};
    margin-top:${(props) => props.theme.space[2]};
`;

const Icon=styled(Ionicons)`
    color:${(props) => props.theme.text};
`;

export const VendorRestaurantDetail = ({ route }) => {

    const {name}=route.params
    const { addItem,isLoading,restaurant, sortMenuList } = useContext(VendorRestaurantContext)
    const [restaurantItems,setRestaurantItems]=useState(null)
    const [localLoading,setLocalLoading]=useState(false)
    const [add,setAdd]=useState(false)
    const [item,setItem]=useState("")
    const [cost,setCost]=useState("")
    const [error,setError]=useState(null)
    const { orientation } = useContext(DeviceOrientationContext)
    const [type, setType] = useState('Veg');
    const { scheme } = useContext(AppThemeContext)

    if(!!error)
    {
        setTimeout(()=>{setError(null)},5000)
    }

    useEffect(()=>{
        setLocalLoading(true)
        restaurant.forEach(element => {
            if(element.Name==name)
            {
                sortMenuList(element)
                setRestaurantItems(element)
            }
        });
        setLocalLoading(false)
    },[restaurant])

    if(!restaurantItems)
    {
        return(
            <View style={{marginTop:50}}>
                <ActivityIndicator color="purple" size={50} />
            </View>
        )
    }

    return (
        <Container>
            <RestaurantText>{restaurantItems.Name}</RestaurantText>   
            {isLoading||localLoading?
            (
                <View style={{marginTop:50}}>
                    <ActivityIndicator color="purple" size={50} />
                </View>
            ):(
                <>
                    <Scroll keyboardShouldPersistTaps={'handled'} contentContainerStyle={{flexGrow:1}}>
                        {restaurantItems.menuList.map((ele)=>{
                            const key=ele.title
                            return(
                                <VendorMenuDetail key={key}
                                    foodItem={ele} 
                                    Restaurant={restaurantItems.Name} 
                                    oriTag={orientation==1||orientation==2?0:1} />
                            )
                        })}
                    </Scroll>
                    {add?
                    (
                        <View style={{borderRadius:8,borderWidth:0.5,marginHorizontal:5,marginBottom:5,borderColor:"rgb(150,150,150)"}}>
                            <View style={{flexDirection:"row"}}>
                                <View style={{flex:0.4,alignItems:"center"}}>
                                    <Add>Name: </Add>  
                                    <Input
                                        label="New item"
                                        textContentType="username"
                                        keyboardType="default"
                                        autoCapitalize="words"
                                        onChangeText={(text) => setItem(text)} />  
                                </View>  
                                <View style={{flex:0.4,alignItems:"center"}}>
                                    <Add>Cost: </Add> 
                                    <Input
                                        label="Item Cost"
                                        textContentType="telephoneNumber"
                                        keyboardType="phone-pad"
                                        autoCapitalize="none"
                                        onChangeText={(text) => setCost(text)} /> 
                                </View>     
                                <View style={{flex:0.2,alignItems:"flex-start"}}>
                                    <Touch activeOpacity={0.65} onPress={async ()=>{
                                        setError(await (addItem(item,cost,type,restaurantItems.Name)))
                                        setAdd(!add)
                                        setItem("")
                                        setCost("")
                                        setType("Veg")
                                        }}
                                        >
                                        <Icon name="checkmark-circle-outline" size={28} style={{marginTop:16}} />
                                    </Touch>
                                </View>   
                            </View>
                            <View>
                                <View style={{flexDirection:"row", alignItems:"center"}}>
                                <RadioButton
                                    status={ type === 'Veg' ? 'checked' : 'unchecked' }
                                    onPress={() => setType('Veg')}
                                    color="green"
                                    uncheckedColor={scheme=="dark"?"white":"#191919"}
                                />
                                <Add onPress={() => setType('Veg')}>Veg </Add> 
                                </View>
                                <View style={{flexDirection:"row", alignItems:"center"}}>
                                <RadioButton
                                    status={ type === 'Non Veg' ? 'checked' : 'unchecked' }
                                    onPress={() => setType('Non Veg')}
                                    color="red"
                                    uncheckedColor={scheme=="dark"?"white":"#191919"}
                                />
                                <Add onPress={() => setType('Non Veg')}>Non Veg </Add> 
                                </View>
                            </View>  
                        </View>
                    ):
                    (
                        <></>
                    )

                    }
                    <BottomBar>
                        {!!error?
                        (
                            <View style={{flex:1,alignItems:"center"}}>
                                <Error>Error: {error}</Error>
                            </View>
                        ):
                        (
                            <TouchableOpacity activeOpacity={0.65} onPress={()=>setAdd(!add)} style={{flex:1,alignItems:"center"}}>
                                <AddText>Add food item</AddText>
                            </TouchableOpacity>
                        )
                        }
                    </BottomBar> 
                </>
            )
            }                 
        </Container>
    )
};
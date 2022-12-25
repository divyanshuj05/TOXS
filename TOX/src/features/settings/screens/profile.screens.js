import React, { useContext, useState } from 'react'
import { View, TouchableOpacity, Text, ScrollView, Switch, ActivityIndicator } from "react-native"
import { AuthenticationContext } from '../../../services/authentication/authentication.context'
import { SafeArea } from '../../../utils/components/safe-area.components'
import styled from 'styled-components'
import { Ionicons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { TextInput } from 'react-native-paper';
import { DeviceOrientationContext } from '../../../services/common/deviceOrientation.context'
import { AppThemeContext } from "../../../services/common/theme.context"

const Scroll = styled(ScrollView)`
    flex:1
`;

const Title = styled(Text)`
    margin-top:${(props) => props.theme.space[4]};
    margin-bottom:${(props) => props.theme.space[4]};
    text-align:center;
    color:${(props) => props.theme.text};
    font-size: ${(props) => props.theme.fontSizes.h5};
    font-weight: ${(props) => props.theme.fontWeights.medium};
    font-family:${(props) => props.theme.fonts.body};
`;

const DetailsIcon = styled(Ionicons)`
    color:${props => props.theme.text}
    margin-left:${(props) => props.theme.space[4]};
    margin-bottom: 29px;
    margin-top: 29px;
    flex:0.1
`;

const MobileVisText = styled(Text)`
    color:${props => props.theme.text}
    margin-left:${(props) => props.theme.space[4]};
    margin-bottom: 29px;
    font-size: ${(props) => props.theme.fontSizes.body};
`;

const DetailsIconCopy = styled(Fontisto)`
    color:${props => props.theme.text}
    margin-left:${(props) => props.theme.space[4]};
    margin-bottom: 29px;
    margin-top: 29px;
    flex:0.1;
`;

const Details = styled(Text)`
    margin-left: 40px;
    margin-bottom: ${(props) => props.theme.space[4]};
    margin-top: ${(props) => props.theme.space[4]};
    font-size: ${(props) => props.theme.fontSizes.body};
    color:${props => props.theme.text};
    font-family:${(props) => props.theme.fonts.heading};
    flex:0.80;
`;

const UpdateButton = styled(Fontisto)`
    margin-bottom: ${(props) => props.theme.space[4]};
    margin-top: ${(props) => props.theme.space[4]};
    color:${props => props.theme.text};
`;

const UpdateButtonCopy = styled(Ionicons)`
    margin-bottom: ${(props) => props.theme.space[4]};
    margin-top: ${(props) => props.theme.space[4]};
    color:${props => props.theme.text};
`;

const BorderView = styled(View)`
    border-bottom-width: 0.5px;
    border-bottom-color:${props => props.theme.colors.brand.basic};
    margin-horizontal:18px
`;

const Input = styled(TextInput)`
    flex:0.8;
    margin:16px;
`;

const Error = styled(Text)`
    margin-left:${(props) => props.theme.space[4]}; 
    color:${props => props.theme.colors.ui.error}
`;

export const ProfileScreen = () => {

    const { user, UpdateDoc, isLoading } = useContext(AuthenticationContext)
    const { scheme } = useContext(AppThemeContext)
    const { isOrientationLoading } = useContext(DeviceOrientationContext)
    const [updateUser, setUpdateUser] = useState(false)
    const [updatePass, setUpdatePass] = useState(false)
    const [errorUser, setErrorUser] = useState(null)
    const [errorPass, setErrorPass] = useState(null)
    const [newUser, setNewUser] = useState("")
    const [newPass, setNewPass] = useState("")

    if(isOrientationLoading)
    {
        return(
            <Scroll style={{backgroundColor:scheme=="dark"?"#191919":"#ffffff"}}>
                <ActivityIndicator style={{marginTop:50}} color="purple" size={50} />
            </Scroll>
        )
    }

    const handleMobileVisible = () => {
        const newVal=user.mobileDisplay==="Yes" ? "No":"Yes"
        UpdateDoc("mobileDisplay",newVal,user.type)
    }
    return (
        <SafeArea>
            <Scroll style={{backgroundColor:scheme=="dark"?"#191919":"#ffffff"}} keyboardShouldPersistTaps={'handled'}>
                <Title>User Details</Title>
                {isLoading?
                (
                    <ActivityIndicator style={{marginTop:50}} color="purple" size={50} />
                )
                :
                (
                    <>
                        <BorderView>
                            <View style={{ flexDirection: "row" }}>
                                <DetailsIcon name="person-outline" size={22} />
                                {updateUser ?
                                    (
                                        <>
                                            <Input
                                                label="Input new username"
                                                value={newUser}
                                                textContentType="username"
                                                keyboardType="default"
                                                autoCapitalize="words"
                                                onChangeText={(text) => { setNewUser(text) }} />
                                            <TouchableOpacity activeOpacity={0.65} onPress={() => {
                                                setErrorUser(null)
                                                let result = UpdateDoc("userName", newUser,user.type)
                                                if (result === true) {
                                                    setUpdateUser(false)
                                                }
                                                else { setErrorUser(result) }
                                            }}>
                                                <UpdateButtonCopy name="checkmark-circle-outline" size={26} />
                                            </TouchableOpacity>
                                        </>
                                    ) :
                                    (
                                        <>
                                            <Details>{user.userName}</Details>
                                            {user.type=="users"?
                                            (
                                                <TouchableOpacity activeOpacity={0.65} onPress={() => { setUpdateUser(true), setErrorUser(null) }}>
                                                    <UpdateButton name="spinner-refresh" size={22} />
                                                </TouchableOpacity>
                                            ):
                                            (<></>)}
                                        </>
                                    )
                                }
                            </View>
                            {errorUser ?
                                (
                                    <Error>{errorUser}</Error>
                                ) : (<></>)
                            }
                        </BorderView>

                        <BorderView>
                            <View style={{ flexDirection: "row" }}>
                                <DetailsIconCopy name="email" size={22} />
                                <Details>{user.email}</Details>
                            </View>
                        </BorderView>

                        <BorderView>
                            <View style={{ flexDirection: "row" }}>
                                <DetailsIconCopy name="mobile-alt" size={22} />
                                <Details>{user.mobileNo}</Details>
                            </View>
                            {user.type==="users"?
                            (
                                <View style={{flex:1,flexDirection:"row"}}>
                                    <View style={{flex:0.7}}>
                                        <MobileVisText>Mobile Number Visibility: {user.mobileDisplay==="Yes" ? "On":"Off"}</MobileVisText>
                                    </View>
                                    <View style={{flex:0.3}}>
                                        <Switch
                                            style={{alignSelf:"center",margin:-12}}
                                            trackColor={{ true: "#126412", false: "#641212" }}
                                            thumbColor={user.mobileDisplay==="Yes" ? "green":"red"}
                                            onValueChange={handleMobileVisible}
                                            value={user.mobileDisplay==="Yes"?true:false}
                                        />
                                    </View>
                                </View>
                            ):
                            (
                                <></>
                            )
                            }
                        </BorderView>

                        <BorderView>
                            <View style={{ flexDirection: "row" }}>
                                <DetailsIcon name="eye-outline" size={22} />
                                {updatePass ?
                                    (
                                        <>
                                            <Input
                                                label="Input new password"
                                                value={newPass}
                                                textContentType="password"
                                                secureTextEntry
                                                autoCapitalize="none"
                                                onChangeText={(text) => { setNewPass(text) }} />
                                            <TouchableOpacity activeOpacity={0.65} onPress={() => {
                                                setErrorPass(null)
                                                const result = UpdateDoc("password", newPass,user.type)
                                                if (result === true) {
                                                    setUpdatePass(false)
                                                }
                                                else { setErrorPass(result) }
                                            }}>
                                                <UpdateButtonCopy name="checkmark-circle-outline" size={26} />
                                            </TouchableOpacity>
                                        </>
                                    ) :
                                    (
                                        <>
                                            <Details>******{user.password.substring(6)}</Details>
                                            <TouchableOpacity activeOpacity={0.65} onPress={() => { setUpdatePass(true), setErrorPass(null) }}>
                                                <UpdateButton name="spinner-refresh" size={22} />
                                            </TouchableOpacity>
                                        </>
                                    )

                                }
                            </View>
                            {errorPass ?
                                (
                                    <Error>{errorPass}</Error>
                                ) : (<></>)
                            }
                        </BorderView>
                
                        {user.type=="vendors"?
                            (
                                <BorderView>
                                    <View style={{ flexDirection: "row" }}>
                                        <DetailsIcon name="md-restaurant-outline" size={22} />
                                        <Details>{user.restaurant}</Details>
                                    </View>
                                </BorderView>
                            ):(<></>)}
                    </>
                )}
            </Scroll>    
        </SafeArea>
    )
}
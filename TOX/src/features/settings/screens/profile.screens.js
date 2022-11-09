import React, { useContext, useState } from 'react'
import { View, TouchableOpacity } from "react-native"
import { AuthenticationContext } from '../../../services/authentication/authentication.context'
import { SafeArea } from '../../../utils/components/safe-area.components'
import styled from 'styled-components'
import { Ionicons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { TextInput } from 'react-native-paper';
import { ActivityIndicator, Colors } from "react-native-paper";
import { DeviceOrientationContext } from '../../../services/common/deviceOrientation.context'

const Scroll = styled.ScrollView`
    flex:1
    background-color:${(props) => props.theme.background}
`;

const Title = styled.Text`
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

const DetailsIconCopy = styled(Fontisto)`
    color:${props => props.theme.text}
    margin-left:${(props) => props.theme.space[4]};
    margin-bottom: 29px;
    margin-top: 29px;
    flex:0.1;
`;

const Details = styled.Text`
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

const BorderView = styled.View`
    border-bottom-width: 0.5px;
    border-bottom-color:${props => props.theme.colors.brand.basic};
    margin-horizontal:18px
`;

const Input = styled(TextInput)`
    flex:0.8;
    margin:16px;
`;

const Error = styled.Text`
    margin-left:${(props) => props.theme.space[4]}; 
    color:${props => props.theme.colors.ui.error}
`;

export const ProfileScreen = () => {

    const { user, UpdateDoc } = useContext(AuthenticationContext)
    const { isOrientationLoading } = useContext(DeviceOrientationContext)
    const [updateUser, setUpdateUser] = useState(false)
    const [updateMobile, setUpdateMobile] = useState(false)
    const [updatePass, setUpdatePass] = useState(false)
    const [errorUser, setErrorUser] = useState(null)
    const [errorMob, setErrorMob] = useState(null)
    const [errorPass, setErrorPass] = useState(null)
    const [newUser, setNewUser] = useState("")
    const [newMobile, setNewMobile] = useState("")
    const [newPass, setNewPass] = useState("")

    if(isOrientationLoading)
    {
        return(
            <Scroll>
                <ActivityIndicator style={{marginTop:50}} color={Colors.red400} size={50} />
            </Scroll>
        )
    }

    return (
        <Scroll>
            <SafeArea>
                <Title>User Details</Title>
                <BorderView >
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
                        {updateMobile ?
                            (
                                <>
                                    <Input
                                        label="Input new mobile number"
                                        value={newMobile}
                                        textContentType="telephoneNumber"
                                        keyboardType="phone-pad"
                                        autoCapitalize="none"
                                        onChangeText={(text) => { setNewMobile(text) }} />
                                    <TouchableOpacity activeOpacity={0.65} onPress={() => {
                                        setErrorMob(null)
                                        const result = UpdateDoc("mobileNo", newMobile,user.type)
                                        if (result === true) {
                                            setUpdateMobile(false)
                                        }
                                        else { setErrorMob(result) }
                                    }}>
                                        <UpdateButtonCopy name="checkmark-circle-outline" size={26} />
                                    </TouchableOpacity>
                                </>
                            ) :
                            (
                                <>
                                    <Details>{user.mobileNo}</Details>
                                    <TouchableOpacity activeOpacity={0.65} onPress={() => { setUpdateMobile(true), setErrorMob(null) }}>
                                        <UpdateButton name="spinner-refresh" size={22} />
                                    </TouchableOpacity>
                                </>
                            )

                        }
                    </View>
                    {errorMob ?
                        (
                            <Error>{errorMob}</Error>
                        ) : (<></>)
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
            </SafeArea>
        </Scroll>
    )
}
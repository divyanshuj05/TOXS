import React, { useContext, useState } from "react";
import { View, ScrollView, TouchableOpacity, Image } from "react-native";
import styled from "styled-components/native";
import { List, Avatar } from "react-native-paper";
import { Text } from "../../common/components/typography/text.component";
import { Spacer } from "../../common/components/spacer/spacer.component";
import { SafeArea } from "../../../utils/components/safe-area.components";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import { AppThemeContext } from "../../../services/common/theme.context";
import { DeviceOrientationContext } from "../../../services/common/deviceOrientation.context";
import * as ImagePicker from "expo-image-picker"
import { ActivityIndicator, Colors } from "react-native-paper";

const Container = styled(ScrollView)`
  flex:1;
  background-color:${props => props.theme.background};
`;

const SettingsItem = styled(List.Item)`
  padding: ${(props) => props.theme.space[3]};
`;

const AvatarContainer = styled(View)`
  align-items: center;
  margin-vertical:${props => props.theme.space[4]};
  
`;

const CameraStyle = styled(Avatar.Icon)`
  margin-horizontal:30px
  margin-top:-28px;
`; 

export const SettingsScreen = ({ navigation }) => {

  const { onLogout, user, SaveUserImage, isLoading, RemoveUserImage } = useContext(AuthenticationContext);
  const { scheme, setScheme } = useContext(AppThemeContext)
  const [count, setCount] = useState(true);
  const [image,setImage]=useState(null)
  const { orientation } = useContext(DeviceOrientationContext)

  const cameraImageHandler = async() => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
        if (permissionResult.granted === false) {
          alert("You've refused to allow this app to access your camera!");
          return;
        }
        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [6, 5],
            quality: 1,
        });
        if (!result.cancelled) {
            if(result==null) alert("Some error occured! Please try again")
            if(result.type!="image") setError("Only images are allowed")
            else {
              setImage(result)
              SaveUserImage(result)
            };
        }
  }

  const UserNameView = () => {
    return(
      <AvatarContainer>
        {isLoading?
        (
          <ActivityIndicator style={{marginTop:50}} color={Colors.red400} size={50} />
        ):
        (
          user.photo==null||user.photo=="null"||user.photo==undefined?
          (
            <>
              <Avatar.Icon size={180} icon="account" backgroundColor="purple" />
              <TouchableOpacity activeOpacity={0.65} onPress={cameraImageHandler}>
                <CameraStyle size={35} icon="camera" color={scheme == "light" ? "black" : "white"} backgroundColor={scheme == "light" ? "white" : "#191919"} />
              </TouchableOpacity>
            </>
          ):
          (
              <>
                <Image style={{flex: 0.7,
                  width: 180,
                  height: 180,
                  resizeMode:"contain",
                  borderRadius:128
                }} 
                source={{uri:user.photo}} />
                <View style={{flexDirection:"row"}}>
                <TouchableOpacity activeOpacity={0.65} onPress={()=>RemoveUserImage()}>
                  <CameraStyle size={35} icon="minus-circle-outline" color={scheme == "light" ? "black" : "white"} backgroundColor={scheme == "light" ? "white" : "#191919"} />
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.65} onPress={cameraImageHandler}>
                  <CameraStyle size={35} icon="camera" color={scheme == "light" ? "black" : "white"} backgroundColor={scheme == "light" ? "white" : "#191919"} />
                </TouchableOpacity>
                </View>
              </>
          )
        )
        }
          <Spacer position="top" size="large">
            <Text variant="label" style={{ color: scheme == "light" ? "black" : "white" }}>{user.userName}</Text>
          </Spacer>
      </AvatarContainer>
    )
  }

  const ListView = () => {
    return(
      <List.Section>
          {
            user.type=="vendors"?
            (<></>):
            (
              <>
                <SettingsItem
                title="Contact and Feedback"
                left={(props) => <List.Icon {...props} color={scheme == "light" ? "black" : "white"} icon="message-alert" />}
                onPress={() => navigation.navigate("Feedback")}
                titleStyle={{ color: scheme == "light" ? "black" : "white" }}
                descriptionStyle={{ color: scheme == "light" ? "black" : "white" }}
                />
            </>
            )
          }
          <SettingsItem
            title="Change theme"
            left={(props) => <List.Icon {...props} color={scheme == "light" ? "black" : "white"} icon="lightbulb-outline" />}
            onPress={() => { scheme == "light" ? (setScheme("dark"), setCount(!count)) : (setScheme("light"), setCount(!count)) }}
            titleStyle={{ color: scheme == "light" ? "black" : "white" }}
          />
          <SettingsItem
            title="Logout"
            left={(props) => <List.Icon {...props} color={scheme == "light" ? "black" : "white"} icon="logout" />}
            onPress={onLogout}
            titleStyle={{ color: scheme == "light" ? "black" : "white" }}
          />
        </List.Section>
    )
  }

  if(orientation==1||orientation==2)
  {
    return(
      <SafeArea>
        <Container>
          {UserNameView()}
          {ListView()}
        </Container>
      </SafeArea>
    )
  }
  else{
    return(
      <SafeArea>
        <Container>
          <View style={{flexDirection:"row"}}>
            <View style={{flex:0.4}}>
              {UserNameView()}
            </View>
            <View style={{flex:0.6}}>
              <View style={{flex:1,justifyContent:"center"}}>
                {ListView()}
              </View>
            </View>
          </View>
        </Container>
      </SafeArea>

    )
  }

};
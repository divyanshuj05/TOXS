import React, { useContext, useState } from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import { List, Avatar } from "react-native-paper";
import { Text } from "../../common/components/typography/text.component";
import { Spacer } from "../../common/components/spacer/spacer.component";
import { SafeArea } from "../../../utils/components/safe-area.components";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import { AppThemeContext } from "../../../services/common/theme.context";
import { DeviceOrientationContext } from "../../../services/common/deviceOrientation.context";

const Container = styled.ScrollView`
  flex:1;
  background-color:${props => props.theme.background};
`;

const SettingsItem = styled(List.Item)`
  padding: ${(props) => props.theme.space[3]};
`;
const AvatarContainer = styled.View`
  align-items: center;
  margin-vertical:${props => props.theme.space[4]};
  
`;

export const SettingsScreen = ({ navigation }) => {

  const { onLogout, user } = useContext(AuthenticationContext);
  const { scheme, setScheme } = useContext(AppThemeContext)
  const [count, setCount] = useState(true);
  const { orientation } = useContext(DeviceOrientationContext)

  const UserNameView = () => {
    return(
      <AvatarContainer>
          <Avatar.Icon size={180} icon="account" backgroundColor="purple" />
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
                title="Favourites"
                description="View your favourites"
                left={(props) => <List.Icon {...props} color={scheme == "light" ? "black" : "white"} icon="heart" />}
                onPress={() => navigation.navigate("Favourites")}
                titleStyle={{ color: scheme == "light" ? "black" : "white" }}
                descriptionStyle={{ color: scheme == "light" ? "black" : "white" }}
                />
                <SettingsItem
                title="Feedback"
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
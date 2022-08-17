import React, { useContext, useState } from "react";
import styled from "styled-components/native";
import { List, Avatar } from "react-native-paper";
import { Text } from "../../common/components/typography/text.component";
import { Spacer } from "../../common/components/spacer/spacer.component";
import { SafeArea } from "../../../utils/components/safe-area.components";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import { AppThemeContext } from "../../../services/common/theme.context";

const Container = styled.View`
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

  return (
    <SafeArea>
      <Container>
        <AvatarContainer>
          <Avatar.Icon size={180} icon="food" backgroundColor="purple" />
          <Spacer position="top" size="large">
            <Text variant="label" style={{ color: scheme == "light" ? "black" : "white" }}>{user.email}</Text>
          </Spacer>
        </AvatarContainer>

        <List.Section>
          <SettingsItem
            title="Favourites"
            description="View your favourites"
            left={(props) => <List.Icon {...props} color={scheme == "light" ? "black" : "white"} icon="heart" />}
            onPress={() => navigation.navigate("Favourites")}
            titleStyle={{ color: scheme == "light" ? "black" : "white" }}
            descriptionStyle={{ color: scheme == "light" ? "black" : "white" }}
          />
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
      </Container>
    </SafeArea>
  );
};
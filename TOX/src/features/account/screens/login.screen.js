import React, { useState, useContext } from "react";
import { ActivityIndicator, Colors } from "react-native-paper";

import {
  AccountBackground,
  AccountCover,
  AccountContainer,
  AuthButton,
  AuthInput,
  ErrorContainer,
  Title,
} from "../components/account.styles";
import { Text } from "../../common/components/typography/text.component";
import { Spacer } from "../../common/components/spacer/spacer.component";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";

export const LoginScreen = ({ route,navigation }) => {
  const {collection}=route.params
  
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { onLogin, error, isLoading, setError } = useContext(AuthenticationContext);
  return (
    <AccountBackground>
      <AccountCover />
      <Title>TOXs</Title>
      <AccountContainer>
        <AuthInput
          label="User Name"
          value={userName}
          textContentType="username"
          keyboardType="default"
          autoCapitalize="words"
          onChangeText={(u) => setUserName(u)}
        />
        <Spacer size="large">
          <AuthInput
            label="Password"
            value={password}
            textContentType="password"
            secureTextEntry
            autoCapitalize="none"
            onChangeText={(p) => setPassword(p)}
          />
        </Spacer>
        {error && (
          <ErrorContainer size="large">
            <Text variant="error">{error}</Text>
          </ErrorContainer>
        )}
        <Spacer size="large">
          {!isLoading ? (
            <AuthButton
              icon="food"
              mode="contained"
              onPress={() => { setError(null), onLogin(userName, password,collection) }}
            >
              Login
            </AuthButton>
          ) : (
            <ActivityIndicator animating={true} color={Colors.blue300} />
          )}
        </Spacer>
      </AccountContainer>
      <Spacer size="large">
        <AuthButton mode="contained" onPress={() => { setError(null), navigation.goBack() }}>
          Back
        </AuthButton>
      </Spacer>
    </AccountBackground>
  );
};
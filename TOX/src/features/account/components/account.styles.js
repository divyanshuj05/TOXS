import styled from "styled-components/native";
import { Button, TextInput } from "react-native-paper";
import { Text } from "../../common/components/typography/text.component";

export const AccountBackground = styled.ImageBackground.attrs({
  source: require("../../../../assets/home_bg.jpg"),
})`
  flex: 1;
`;

export const AccountCover = styled.View`
  background-color: rgba(255, 255, 255, 0.3);
`;

export const AccountContainer = styled.View`
  background-color: rgba(255, 255, 255, 0.7);
  padding: ${(props) => props.theme.space[4]};
  border-radius:12px;
  margin-horizontal: ${(props) => props.theme.space[5]};
  margin-vertical:${(props) => props.theme.space[3]};
`;

export const AuthButton = styled(Button).attrs({
  color: "purple",
})`
  padding: ${(props) => props.theme.space[2]};
  border-radius:8px;
`;

export const AuthInput = styled(TextInput)`
  width: 287px;
`;

export const AuthInputLand = styled(TextInput)`
  width: 400px;
`;

export const Title = styled(Text)`
  text-align:center
  font-size: 30px;
`;

export const ErrorContainer = styled.View`
  max-width: 300px;
  align-items: center;
  align-self: center;
  margin-top: ${(props) => props.theme.space[2]};
  margin-bottom: ${(props) => props.theme.space[2]};
`;

export const AnimationWrapper = styled.View`
  width: 100%;
  height: 40%;
  position: absolute;
  top: 1px;
  padding: ${(props) => props.theme.space[2]};
`;

export const AnimationWrapperLand = styled.View`
  flex:0.4
  justify-content:center
  align-items:center
  margin-top:25px
`;
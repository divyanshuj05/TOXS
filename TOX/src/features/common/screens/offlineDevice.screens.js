import React from 'react'
import { Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import styled from 'styled-components';

const Title = styled(Text)`
  text-align:center
  font-size: 30px;
`;

const AccountBackground = styled.ImageBackground.attrs({
    source: require("../../../../assets/home_bg.jpg"),
  })`
    flex: 1;
    justify-content:center
    align-items:center
  `;

const AccountContainer = styled(View)`
  background-color: rgba(255, 255, 255, 0.7);
  padding: 16px
  align-items:center
`;

export const DeviceOffline = () => {
    return(
        <AccountBackground>
            <AccountContainer>
                <Title>TOXs</Title>
                <MaterialIcons name="wifi-off" size={24} color="black" />
                <Text style={{textAlign:"center"}}>You are Offline!!{"\n"}Re-connect to internet to use TOXs</Text>
            </AccountContainer>
        </AccountBackground>
    )
}

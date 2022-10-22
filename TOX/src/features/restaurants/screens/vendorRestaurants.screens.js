import React from 'react'
import { Text, View } from "react-native"
import { SafeArea } from '../../../utils/components/safe-area.components';
import styled from 'styled-components'

const Container=styled.View`
    flex:1
    background-color: ${props=>props.theme.background}
`;

const MyText=styled.Text`
    color: ${props=>props.theme.text}
`;

export const VendorRestaurantScreen = ({ navigation }) => {
    return(
        <SafeArea>
            <Container>
                <MyText>vendor restaurant screen</MyText>
            </Container>
        </SafeArea>
    )
}
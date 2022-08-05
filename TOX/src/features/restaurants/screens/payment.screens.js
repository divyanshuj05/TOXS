import React from 'react';
import { Text } from "react-native";
import { SafeArea } from '../../../utils/components/safe-area.components';
import styled from 'styled-components';

const Container = styled.View`
    flex:1;
    background-color:${(props) => props.theme.background};
`;

const PayText = styled.Text`
    color:${(props) => props.theme.text};
`;

export const PaymentScreen = () => {
    return (
        <Container>
            <PayText>Payments Screen!</PayText>
        </Container>
    )
}
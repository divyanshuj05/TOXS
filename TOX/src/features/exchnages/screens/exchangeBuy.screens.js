import React from 'react';
import { View } from "react-native"
import styled from 'styled-components';

const Wrapper = styled(View)`
    flex:1;
    background-color:${(props) => props.theme.background};
`;

const Head=styled.Text`
    color:${props=>props.theme.text}
`;

export const BuyScreen = () => {
    return (
        <Wrapper>
            <Head>Buy Screen</Head>
        </Wrapper>
    )
}
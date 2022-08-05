import React from 'react';
import { Image, View } from "react-native"
import styled from 'styled-components';
import { SafeArea } from '../../../utils/components/safe-area.components';
import { Soon } from "../../../../assets/images";

const Wrapper = styled(View)`
    flex:1;
    background-color:${(props) => props.theme.colors.bg.primary};
    justify-content:center;
    align-items:center;
`;

const SoonImage = styled(Image)`
    height:300px;
    width: 300px;
`;

export const ExchangeScreen = () => {
    return (
        <SafeArea>
            <Wrapper>
                <SoonImage source={Soon} />
            </Wrapper>
        </SafeArea>
    )
}
import React from 'react'
import { View } from "react-native"
import styled from 'styled-components'
import { Card } from 'react-native-paper';

const CardContainer = styled.View`
    margin:${(props) => props.theme.space[3]};
`;

const ItemInfo = styled.View`
    padding: ${(props) => props.theme.space[2]}
    background-color:${props => props.theme.colors.brand.basic};
    broder-radius:px;
`;

const Title = styled.Text`
    font-size: ${(props) => props.theme.fontSizes.h5};
    font-weight: ${(props) => props.theme.fontWeights.medium};
    font-family: ${props => props.theme.fonts.heading};
    flex:0.8
`;

const Category=styled.Text`
    font-size: ${(props) => props.theme.fontSizes.body};
    font-weight: ${(props) => props.theme.fontWeights.medium};
    font-family: ${props => props.theme.fonts.body};
    flex:0.2
`;

const Desc=styled.Text`
    font-size: ${(props) => props.theme.fontSizes.body};
    font-weight: ${(props) => props.theme.fontWeights.medium};
    font-family: ${props => props.theme.fonts.body};
`;

const Cost=styled.Text`
    font-size: ${(props) => props.theme.fontSizes.body};
    font-weight: ${(props) => props.theme.fontWeights.medium};
    font-family: ${props => props.theme.fonts.body};
`;

export const ItemInfoCard = ({ item }) => {
    return(
        <CardContainer>
            <Card elevation={5}>
                <Card.Cover key={item.item.imgName} source={{ uri: item.item.imageURL }} style={{ height: 150 }} />
                <ItemInfo>
                    <View style={{flexDirection:"row"}}>
                        <Title>{item.item.name}</Title>
                        <Category>{item.item.category}</Category>
                    </View>
                    <Desc>{item.item.description}</Desc>
                    <Cost>Expected Price: ₹{item.item.cost}</Cost>
                </ItemInfo>
            </Card>
        </CardContainer>
    )
}
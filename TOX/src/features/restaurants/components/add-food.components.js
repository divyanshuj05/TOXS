import React, { useState, useContext } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { CartContext } from '../../../services/restaurant/cart.context';
import styled from 'styled-components';

const Count = styled(Text)`
    padding-right:80px;
    color:${(props) => props.theme.text};
    font-family:${(props) => props.theme.fonts.heading};
    margin-left:${(props) => props.theme.space[3]};
    font-size: ${(props) => props.theme.fontSizes.body};
`;

const Wrapper = styled(View)`
    flex-direction:row;
    margin-left:100px;
`;

const Add = styled(Text)`
    text-align:center
    padding-horizontal:${(props) => props.theme.space[2]};
    font-family:${(props) => props.theme.fonts.heading};
    font-size: ${(props) => props.theme.fontSizes.h5};
    color:${(props) => props.theme.text};
    border:2px solid ${(props) => props.theme.text};
    margin-right: ${(props) => props.theme.space[4]};
    border-radius:${(props) => props.theme.space[4]};
`;

const Subtract = styled(Text)`
    text-align:center
    color:${(props) => props.theme.text};
    border:2px solid ${(props) => props.theme.text};
    padding-horizontal: ${(props) => props.theme.space[2]};
    font-family:${(props) => props.theme.fonts.heading};
    font-size: ${(props) => props.theme.fontSizes.h5};
    border-radius:${(props) => props.theme.space[4]};
`;

const AddButton = styled(Text)`
    color:${(props) => props.theme.text};
    border:2px solid ${(props) => props.theme.text};
    text-align:center;
    padding-horizontal:${(props) => props.theme.space[2]};
    padding-vertical:${(props) => props.theme.space[1]};
    border-radius:${(props) => props.theme.space[4]};
    margin-left: ${(props) => props.theme.space[7]};
`;

export const AddFoodItems = ({ foodDetail, count=0 }) => {

    const [subjectCount, setSubjectCount] = useState(count)

    const { items, cost, cal } = useContext(CartContext)

    return (
        <>
            {subjectCount != 0 ?
                (
                    <Wrapper>
                        <Count>{subjectCount}</Count>
                        <TouchableOpacity activeOpacity={0.65} onPress={() => { setSubjectCount(subjectCount + 1), cal(1, foodDetail) }} >
                            <Add>+</Add>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.65} onPress={() => { setSubjectCount(subjectCount - 1), cal(-1, foodDetail) }}>
                            <Subtract>-</Subtract>
                        </TouchableOpacity>
                    </Wrapper>
                ) :
                (
                    <TouchableOpacity activeOpacity={0.65} onPress={() => { setSubjectCount(subjectCount + 1), cal(1, foodDetail) }}>
                        <AddButton>Add</AddButton>
                    </TouchableOpacity>
                )
            }
        </>
    );
}
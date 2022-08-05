import React, { useState, useContext } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { CartContext } from '../../../services/restaurant/cart.context';
import styled from 'styled-components';

const Count = styled.Text`
    padding-right:80px;
    font-family:${(props) => props.theme.fonts.heading};
    margin-left:${(props) => props.theme.space[3]};
    font-size: ${(props) => props.theme.fontSizes.body};
`;

const Wrapper = styled.View`
    flex-direction:row;
    margin-left:100px;
    margin-bottom:${(props) => props.theme.space[1]};
`;

const Add = styled.Text`
    text-align:center
    padding-horizontal:${(props) => props.theme.space[2]};
    font-family:${(props) => props.theme.fonts.heading};
    font-size: ${(props) => props.theme.fontSizes.h5};
    color:rgb(56, 10, 100);
    border:2px solid rgb(56, 10, 100);
    margin-right: ${(props) => props.theme.space[4]};
    border-radius:${(props) => props.theme.space[2]};
`;

const Subtract = styled.Text`
    text-align:center
    color:rgb(56, 10, 100);
    border:2px solid rgb(56, 10, 100);
    padding-horizontal: ${(props) => props.theme.space[2]};
    font-family:${(props) => props.theme.fonts.heading};
    font-size: ${(props) => props.theme.fontSizes.h5};
    border-radius:${(props) => props.theme.space[2]};
`;

const AddButton = styled(Text)`
    color:rgb(56, 10, 100);
    border:2px solid rgb(56, 10, 100);
    text-align:center;
    padding-horizontal:${(props) => props.theme.space[2]};
    padding-vertical:${(props) => props.theme.space[1]};
    border-radius:${(props) => props.theme.space[2]};
    margin-left: ${(props) => props.theme.space[7]};
`;

export const AddFoodItems = ({ foodDetail }) => {

    const { title, price, notAdded } = foodDetail

    const [subjectCount, setSubjectCount] = useState(0)

    const { items, cost, cal } = useContext(CartContext)

    return (
        <>
            {subjectCount != 0 ?
                (
                    <Wrapper>
                        <Count>{subjectCount}</Count>
                        <TouchableOpacity onPress={() => { setSubjectCount(subjectCount + 1), cal(price, 1, title) }} >
                            <Add>+</Add>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { setSubjectCount(subjectCount - 1), cal(-price, -1, title) }}>
                            <Subtract>-</Subtract>
                        </TouchableOpacity>
                    </Wrapper>
                ) :
                (
                    <TouchableOpacity onPress={() => { setSubjectCount(subjectCount + 1), cal(price, 1, title) }}>
                        <AddButton>Add</AddButton>
                    </TouchableOpacity>
                )
            }
        </>
    );
}
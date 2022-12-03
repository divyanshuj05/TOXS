import React, { useState, useContext } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { CartContext } from '../../../services/restaurant/cart.context';
import styled from 'styled-components';
import { AppThemeContext } from '../../../services/common/theme.context';

const Count = styled(Text)`
    flex:0.2
    color:${(props) => props.theme.text};
    text-align:center;
`;

const Wrapper = styled(View)`
    flex-direction:row;
    border:1px solid ${(props) => props.theme.text}; 
    border-radius:16px;
    margin-horizontal:4px;
    padding-vertical:4px;
`;

const AddButton = styled(Text)`
    color:${(props) => props.theme.text};
    text-align:center;
`;

export const AddFoodItems = ({ foodDetail, count=0 }) => {

    const [subjectCount, setSubjectCount] = useState(count)
    const { scheme } = useContext(AppThemeContext)
    const { items, cost, cal } = useContext(CartContext)

    return (
        <>
            {subjectCount != 0 ?
                (
                    <Wrapper>
                        <TouchableOpacity style={{flex:0.4,borderRightWidth:1,borderRightColor:scheme=="dark"?"white":"#191919"}} activeOpacity={0.65} onPress={() => { setSubjectCount(subjectCount - 1), cal(-1, foodDetail) }}>
                            <AddButton>-</AddButton>
                        </TouchableOpacity>
                        <Count>{subjectCount}</Count>
                        <TouchableOpacity style={{flex:0.4,borderLeftWidth:1,borderLeftColor:scheme=="dark"?"white":"#191919"}} activeOpacity={0.65} onPress={() => { setSubjectCount(subjectCount + 1), cal(1, foodDetail) }} >
                            <AddButton>+</AddButton>
                        </TouchableOpacity>
                    </Wrapper>
                ) :
                (
                    <Wrapper>
                        <TouchableOpacity style={{flex:1}} activeOpacity={0.65} onPress={() => { setSubjectCount(subjectCount + 1), cal(1, foodDetail) }}>
                            <AddButton>Add</AddButton>
                        </TouchableOpacity>
                    </Wrapper>
                )
            }
        </>
    );
}
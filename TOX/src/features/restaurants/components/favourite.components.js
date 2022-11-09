import React, { useContext, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { AntDesign } from "@expo/vector-icons";
import styled from 'styled-components';

const FavouriteButton = styled(TouchableOpacity)`
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 9;
`;

export const Favourite = ({ restaurant, favourites, add, remove }) => {

    const [count, setCount] = useState(true)

    let isFavourite = false

    for (let i = 0; i < favourites.length; i++) {
        if (favourites[i] === restaurant) {
            isFavourite = true;
            break;
        }
        else { isFavourite = false }
    }

    return (
        <FavouriteButton activeOpacity={0.65}
            onPress={() =>
                !isFavourite
                    ? (add(restaurant), setCount(!count))
                    : (remove(restaurant), setCount(!count))
            }
        >
            <AntDesign
                name={isFavourite ? "heart" : "hearto"}
                size={24}
                color={isFavourite ? "red" : "white"}
            />
        </FavouriteButton>
    );
};
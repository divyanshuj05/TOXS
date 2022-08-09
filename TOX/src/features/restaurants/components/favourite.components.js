import React, { useContext, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { FavouritesContext } from '../../../services/restaurant/favourites.context';
import { AntDesign } from "@expo/vector-icons";
import styled from 'styled-components';

const FavouriteButton = styled(TouchableOpacity)`
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 9;
`;

export const Favourite = ({ restaurant }) => {
    const { favourites, addFavoutites, removeFavorites } = useContext(
        FavouritesContext
    );

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
        <FavouriteButton
            onPress={() =>
                !isFavourite
                    ? (addFavoutites(restaurant), setCount(!count))
                    : (removeFavorites(restaurant), setCount(!count))
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
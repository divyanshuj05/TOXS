import React, { createContext, useState, useEffect, useContext } from 'react'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthenticationContext } from "../authentication/authentication.context"

export const FavouritesContext = createContext()

export const FavouritesContextProvider = ({ children }) => {

    const [favourites, setFavourites] = useState([])
    const { user } = useContext(AuthenticationContext);

    const saveFavourites = async (value, uid) => {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem(`@favourites-${uid}`, jsonValue);
        } catch (e) {
            console.log("error storing", e);
        }
    };

    const loadFavourites = async (uid) => {
        try {
            const value = await AsyncStorage.getItem(`@favourites-${uid}`);
            if (value !== "[]") {
                setFavourites(JSON.parse(value));
            }
        } catch (e) {
            console.log("error loading", e);
        }
    };

    const addFavoutites = (restaurant) => {
        setFavourites([...favourites, restaurant])
    }

    const removeFavorites = (restaurant) => {
        const tempList = [...favourites]
        const temp = tempList.indexOf(restaurant)
        tempList.splice(temp, 1)
        setFavourites(tempList)
    }

    useEffect(() => {
        if (user) {
            loadFavourites(user.uid);
        }
    }, [user]);

    useEffect(() => {
        if (user) {
            saveFavourites(favourites, user.uid);
        }
    }, [favourites, user]);

    return (
        <FavouritesContext.Provider value={{ favourites, addFavoutites, removeFavorites }}>
            {children}
        </FavouritesContext.Provider>
    )
}
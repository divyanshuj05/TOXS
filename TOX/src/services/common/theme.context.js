import React, { createContext, useState, useEffect, useContext } from 'react';
import { AuthenticationContext } from '../authentication/authentication.context';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AppThemeContext = createContext();

export const AppThemeContextProvider = ({ children }) => {

    const [scheme, setScheme] = useState("light")
    const { user } = useContext(AuthenticationContext);

    const saveScheme = async (value, uid) => {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.removeItem(`@scheme-${uid}`)
            await AsyncStorage.setItem(`@scheme-${uid}`, jsonValue);
        } catch (e) {
            console.log("error storing", e);
        }
    };

    const loadScheme = async (uid) => {
        try {
            const value = await AsyncStorage.getItem(`@scheme-${uid}`);
            if (value !== null) {
                setScheme(JSON.parse(value));
            }
        } catch (e) {
            console.log("error loading", e);
        }
    };

    useEffect(() => {
        if (user) {
            loadScheme(user.uid);
        }
    }, [user]);

    useEffect(() => {
        if (user) {
            saveScheme(scheme, user.uid);
        }
    }, [scheme, user]);

    return (
        <AppThemeContext.Provider value={{ setScheme, scheme }}>
            {children}
        </AppThemeContext.Provider>
    )
}
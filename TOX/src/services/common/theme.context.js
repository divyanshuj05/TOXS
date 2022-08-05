import React, { createContext, useState } from 'react';

export const AppThemeContext = createContext();

export const AppThemeContextProvider = ({ children }) => {

    const [scheme, setScheme] = useState("light")

    return (
        <AppThemeContext.Provider value={{ setScheme, scheme }}>
            {children}
        </AppThemeContext.Provider>
    )
}
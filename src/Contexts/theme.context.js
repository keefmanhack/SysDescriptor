import React, { createContext, useContext} from 'react';
import { CustomProvider } from 'rsuite';


const ThemeContext = createContext();

export const ThemeProvider = ({children, theme='light'}) => (
    <ThemeContext.Provider value={theme}>
        <CustomProvider theme={theme}>
         {children}
        </CustomProvider>
    </ThemeContext.Provider>
)

export const useTheme = () => useContext(ThemeContext);

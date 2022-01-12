import React, { createContext, useState, useContext, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../misc/firebase";
// import { ProfileDB } from "../Database/ProfileDB";


const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        onAuthStateChanged(auth, (p) => {
            if (p) {
                setUser(p);
            } else {
                setUser(null);
            }
            setIsLoading(false);
        })
    }, [])
    
    return (
        <UserContext.Provider value={{user, isLoading}}>
            {children}
        </UserContext.Provider>
    );
}

export const useUser = () => useContext(UserContext);
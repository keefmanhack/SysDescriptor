import React, { createContext, useContext, useEffect, useState} from 'react';
import {ref, onValue, off} from 'firebase/database';
import database from '../misc/firebase';

const GeneralContext = createContext();

export const GeneralProvider = ({children, sysID}) => {
    const [general, setGeneral] = useState(null);
    const [isUpdating, ] = useState(false);
    
    useEffect(() => {
        //  get general
        const genPath = ref(database, `systems/${sysID}`);
        const listenOnGeneral = () => {
            onValue(genPath, (snap) =>{
                setGeneral(snap.val());
            })
        }

        listenOnGeneral();

        return () => {
            off(genPath);
        }

    }, [])

    return <GeneralContext.Provider value={{general, isUpdating}}>
        {children}
    </GeneralContext.Provider>
}

export const useGeneral = () => useContext(GeneralContext);

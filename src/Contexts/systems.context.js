import React, { createContext, useContext, useEffect, useState} from 'react';
import {ref, onValue, off} from 'firebase/database';
import database from '../misc/firebase';

const SystemsContext = createContext();

export const SystemsProvider = ({children}) => {
    const [systems, setSystems] = useState(null);

    const systemsRef = ref(database, `systems/`);
    useEffect(() => {
        const listenForSystems = () => {
            onValue(systemsRef, (snap) =>{
                setSystems(snap.val());
            })
        }

        listenForSystems();

        return () => {
            off(systemsRef);
        }

    }, [])

    return <SystemsContext.Provider value={systems}>
        {children}
    </SystemsContext.Provider>
}

export const useSystems = () => useContext(SystemsContext);

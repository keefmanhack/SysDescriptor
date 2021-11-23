import React, { createContext, useContext, useEffect, useState} from 'react';
import {ref, onValue, off} from 'firebase/database';
import database from '../misc/firebase';
import Alert from '../misc/Alert';

const SystemsContext = createContext();

export const SystemsProvider = ({children}) => {
    const [systems, setSystems] = useState([]);
    const [isUpdating, setIsUpdating] = useState(false);

    const systemsRef = ref(database, `systems/`);
    useEffect(() => {
        const listenForSystems = () => {
            setIsUpdating(true);
            onValue(systemsRef, (snap) =>{
                const systemJSON = (snap.val()) || {};
                const ids = Object.keys(systemJSON);
                let sysArr = ids.map(id => systemJSON[id]);
                sysArr = sysArr || [];
                setSystems(sysArr);
                setIsUpdating(false);
            }, err => {
                Alert.error(err.message);
                console.log(err);
            })
        }

        listenForSystems();

        return () => {
            off(systemsRef);
        }

    }, [])

    return <SystemsContext.Provider value={{systems, isUpdating}}>
        {children}
    </SystemsContext.Provider>
}

export const useSystems = () => useContext(SystemsContext);

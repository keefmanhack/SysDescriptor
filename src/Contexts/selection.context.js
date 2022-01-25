import React, { createContext, useContext, useState} from 'react';

const SelectionContext = createContext();

export const SelectionProvider = ({children}) => {
    const [selRevID, setselRevID] = useState(null);
    const [selSysID, setselSysID] = useState(null);

    const selectNone = () => {setselRevID(null); setselSysID(null)}
    const setSelection = (rID, sID) => {setselRevID(rID); setselSysID(sID)}
    
    const noneSelected = selRevID===null || selSysID===null;

    return <SelectionContext.Provider value={{selectNone, setSelection, noneSelected, selRevID, selSysID}}>
        {children}
    </SelectionContext.Provider>
}

export const useSelection = () => useContext(SelectionContext);

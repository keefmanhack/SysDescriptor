import React, { createContext, useContext, useState} from 'react';

const ToolbarContext = createContext();

export const ToolBarProvider = ({children}) => {
    const [isUpdating, setIsUpdating] = useState(false);

    return <ToolbarContext.Provider value={{isUpdating, setIsUpdating}}>
        {children}
    </ToolbarContext.Provider>
}

export const useToolBar = () => useContext(ToolbarContext);

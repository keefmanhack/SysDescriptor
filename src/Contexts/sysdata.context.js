import { createContext} from 'react';


const SysDataContext = createContext({
    sysData: null,
    updateSysData: () => {}
});

export default SysDataContext;

import React, { useEffect, useState } from 'react';
import { Input } from 'rsuite';
import { useToolBar } from '../../../../../Contexts/toolbar.context';
import { SoftWareDataDB } from '../../../../../Database/SystemDB/RevisionDB/SubSystemDB/ComponentDB/ComponentItemDB/Data/SoftwareDataDB';

const SoftInput = ({title, compID}) => {
    const [value, setValue] = useState('');
    const [disabled, setDisabled] = useState(false);
    const {setIsUpdating} = useToolBar();

    useEffect(() => {
        const getInitVal = async () => {
            setDisabled(true);
            const data = await SoftWareDataDB.readSpecific(compID, title);
            if(data){setValue(data.value || '')}
            setDisabled(false)
        }
        getInitVal();
    }, []);

    const handleChange = async val => {
        setValue(val);
        setIsUpdating(true);
        await SoftWareDataDB.update(compID, title, val);
        setIsUpdating(false);
    }
    
    return (
        <div>
            <label htmlFor={title}>{title}</label>
            <Input size='xs' disabled={disabled} onChange={handleChange} value={value}/>
        </div>
    );
};

export default SoftInput;
import React, { useEffect, useState } from 'react';
import { Input } from 'rsuite';
import { useToolBar } from '../../../../../../../Contexts/toolbar.context';
import { SoftWareDataDB } from '../../../../../../../Database/SystemDB/RevisionDB/SubSystemDB/ComponentDB/ComponentItemDB/Data/SoftwareDataDB';
import MyDateInput from '../../../../../../Custom Inputs/MyDateInput';
import MyNumberInput from '../../../../../../Custom Inputs/MyNumberInput';

const inputs = {
    Text: Input,
    Number: MyNumberInput,
    Date: MyDateInput
}

const getInput = str => {
    if(!inputs[str]){return inputs.Text}
    return inputs[str]
}

const SoftInput = ({title, itemID, inputType='Text'}) => {
    const MyInput = getInput(inputType);
    const [value, setValue] = useState('');
    const [disabled, setDisabled] = useState(false);
    const {setIsUpdating} = useToolBar();

    useEffect(() => {
        const getInitVal = async () => {
            setDisabled(true);
            const data = await SoftWareDataDB.readSpecific(itemID, title);
            if(data){setValue(data.value || '')}
            setDisabled(false)
        }
        getInitVal();
    }, [itemID, title]);

    const handleChange = async val => {
        setValue(val);
        setIsUpdating(true);
        await SoftWareDataDB.update(itemID, title, val);
        setIsUpdating(false);
    }
    
    return (
        <div>
            <label style={{fontSize: '14px'}} htmlFor={title}>{title}</label>
            <MyInput size='sm' disabled={disabled} onChange={(v)=>handleChange(v)} value={value}/>
        </div>
    );
};

export default SoftInput;
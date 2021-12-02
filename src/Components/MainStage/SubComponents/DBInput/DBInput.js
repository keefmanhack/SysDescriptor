import { get, ref } from 'firebase/database';
import React, {useState, useEffect} from 'react';
import {Input} from 'rsuite';
import Alert from '../../../../misc/Alert';

import database from '../../../../misc/firebase';

const defaultStyle = {fontSize: '12px', width: '75%', display: 'block'}

const DBInput = ({id, title="[Not Named]", onChange, dbPath, style, placeholder, InputType=Input, min, DataType=String, defaultValue=""}) => {
    const [value, setValue] = useState(new DataType(defaultValue));
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const loadValue = async () => {
            const db = ref(database, dbPath);
            setIsLoading(true);
            try{
                const snap = await get(db);
                const v = snap.val();
                setValue( v ?  new DataType(v) : new DataType(defaultValue));
            }catch(err){
                Alert.error(`Error pulling ${title} data from the cloud.`);
            }
            setIsLoading(false);
        }

        loadValue();
    }, [dbPath])

    return (
        <>
            <label htmlFor={id} style={{fontSize:'14px', display: 'block'}}>{title}</label>
            <InputType
                placeholder={placeholder}
                value={value.valueOf()}
                disabled={isLoading}
                id={id}
                style={{...defaultStyle, ...style}}
                onChange={(e) => {onChange(e, dbPath); setValue(e)}}
                min={min}
            />
        </>
    );
};

export default DBInput;
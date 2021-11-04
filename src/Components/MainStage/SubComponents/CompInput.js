import { get, ref } from 'firebase/database';
import React, {useState, useEffect, useRef} from 'react';
import {DatePicker, Input} from 'rsuite';

import database from '../../../misc/firebase';

const defaultStyle = {fontSize: '12px', width: '75%', display: 'block'}

const CompInput = ({inputType, id, title, onChange, dbPath, style, placeholder }) => {
    const [value, setValue] = useState("");
    const inputRef = useRef();

    useEffect(() => {
        const loadValue = async () => {
            const db = ref(database, dbPath);
            inputRef.current.value = "";
            try{
                const snap = await get(db);
                setValue(snap.val() || "");
            }catch(err){
                alert(err);
            }
        }

        loadValue();
    }, [dbPath])

    let input;
    if(inputType==="Date"){
        input = <DatePicker 
                    placeholder={placeholder} 
                    cleanable={false} 
                    ref={inputRef} 
                    value={ value==="" ? new Date() : new Date(value)} 
                    onChange={e=> {setValue(e); onChange(e.toDateString())}} 
                    id={id} 
                    style={style}
                />
    }else{
        input = <Input 
                    placeholder={placeholder} 
                    ref={inputRef}
                    value={value} 
                    onChange={e => {setValue(e); onChange(e)}} 
                    id={id} 
                    style={{...defaultStyle, ...style}}
                />
    }

    return (
        <>
            <label htmlFor={id} style={{fontSize:'14px', display: 'block'}}>{title}</label>
            {input}
        </>
    );
};

export default CompInput;
import React from 'react'
import DBInput from '../DBInput'
import { CustomDate } from './CustomVersions/CustomDate';

export const DBDateInput = ({placeholder, onChange, dbPath, id, style, title}) => (
    <DBInput
        placeholder={placeholder} 
        onChange={(e, path) => {onChange(e.toDateString(), path)}} 
        dbPath={dbPath}
        id={id} 
        style={{...style}}
        InputType={CustomDate}
        title={title}
        cleanable={false}
        DataType={Date}
        defaultValue={new Date()}
    />
)

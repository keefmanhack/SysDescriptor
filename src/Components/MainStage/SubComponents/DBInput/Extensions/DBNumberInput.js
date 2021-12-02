import React from 'react'
import {InputNumber } from 'rsuite'
import DBInput from '../DBInput'

export const DBNumberInput = ({placeholder, onChange, dbPath, id, style, title}) => (
    <DBInput
        placeholder={placeholder} 
        onChange={(e, path) => {onChange(e, path)}} 
        dbPath={dbPath}
        id={id} 
        style={{...style, display: 'flex'}}
        min={0}
        InputType={InputNumber}
        title={title}
        DataType={Number}
        defaultValue={0}
    />
)
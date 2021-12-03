import React from 'react'
import { Input } from 'rsuite'
import DBInput from '../DBInput'

export const DBTextAreaInput = ({placeholder, onChange, dbPath, id, style, title, rows=3}) => (
    <DBInput
        as="textarea" 
        rows={rows}
        placeholder={placeholder} 
        onChange={(e, path) => {onChange(e, path)}} 
        dbPath={dbPath}
        id={id} 
        style={{...style}}
        InputType={Input}
        title={title}
    />
)

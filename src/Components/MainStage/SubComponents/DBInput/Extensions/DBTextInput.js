import React from 'react'
import { Input } from 'rsuite'
import DBInput from '../DBInput'

export const DBTextInput = ({placeholder, onChange, dbPath, id, style, title, noLabel}) => (
    <DBInput
        placeholder={placeholder} 
        onChange={(e, path) => {onChange(e, path)}} 
        dbPath={dbPath}
        id={id} 
        style={{...style}}
        InputType={Input}
        title={title}
        noLabel={noLabel}
    />
)

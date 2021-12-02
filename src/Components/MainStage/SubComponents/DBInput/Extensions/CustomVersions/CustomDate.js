import React from 'react'
import { DatePicker } from 'rsuite'

export const CustomDate = ({onChange, style, id, isLoading, value, placeholder}) => (
    <DatePicker
        placeholder={placeholder}
        value={new Date(value)}
        disabled={isLoading}
        id={id}
        style={style}
        onChange={(e) => onChange(e)}
    />
)

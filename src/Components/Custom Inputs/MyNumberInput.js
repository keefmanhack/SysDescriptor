import React from 'react';
import { InputNumber } from 'rsuite';


const width = {
    xs: '15px',
    sm: '70px',
    md: '150px',
    lg: '100%'
}

const getWidth = str => {
    if(!width[str]){return width.md}
    return width[str];
}

const MyNumberInput = ({value, onChange, size='md', style, disabled, min=0}) => {
    const width = getWidth(size);
    return (
        <InputNumber min={min} disabled={disabled} value={value} onChange={onChange} size={size} style={{width, ...style}}/>
    );
};

export default MyNumberInput;
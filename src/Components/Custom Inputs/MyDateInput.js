import React from 'react';
import { DatePicker } from 'rsuite';

const MyDateInput = ({value, onChange, size='md', style, disabled}) => {
    const date =  Number.isNaN(Date.parse(value)) ? new Date() : new Date(value);

    return (
        <DatePicker cleanable={false} size={size} onChange={onChange} style={{...style, display: 'block'}} disabled={disabled} value={date}/>
    );
};

export default MyDateInput;
import moment from 'moment';
import React from 'react';
import { DatePicker } from 'rsuite';

const MyDateInput = (value, onChange, size='md', style, disabled) => {
    const date =  moment(value).isValid() ? new Date(value) : new Date();

    return (
        <DatePicker size={size} onChange={onChange} style={style} disabled={disabled} value={date}/>
    );
};

export default MyDateInput;
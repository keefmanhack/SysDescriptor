import React from 'react';

const CompProp = ({InputType, id, title, onChange }) => {
    console.log();
    return (
        <li>
            <label htmlFor={id} style={{fontSize:'14px'}}>{title}</label>
            <InputType onChange={e => onChange(e)} id={id} style={{fontSize: '12px', width: '75%', display: 'block'}}/>
        </li>
    );
};

export default CompProp;
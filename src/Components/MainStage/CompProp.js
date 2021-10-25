import React from 'react';

const CompProp = ({Input, id, title }) => {
    console.log();
    return (
        <li>
            <label htmlFor={id} style={{fontSize:'14px'}}>{title}</label>
            <Input id={id} style={{fontSize: '12px', width: '75%'}}/>
        </li>
    );
};

export default CompProp;
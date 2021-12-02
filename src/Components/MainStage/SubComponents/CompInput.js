import React from 'react';
import { DBDateInput } from './DBInput/Extensions/DBDateInput';
import { DBNumberInput } from './DBInput/Extensions/DBNumberInput';
import { DBTextInput } from './DBInput/Extensions/DBTextInput';

// const defaultStyle = {fontSize: '12px', width: '75%', display: 'block'}


const components = {
    Text : DBTextInput,
    Date : DBDateInput,
    Number: DBNumberInput
}

const CompInput = ({inputType, title="[Not Named]", onChange, dbPath, style, placeholder }) => {
    const SelInput = components[inputType || "Text"];

    return (
        <>
            <SelInput
                placeholder={placeholder} 
                onChange={e=> {onChange(e, dbPath)}} 
                style={style}
                dbPath={dbPath}
                title={title}
            />
        </>
    );
};

export default CompInput;
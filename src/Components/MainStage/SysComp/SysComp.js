import React, {useState} from 'react';
import { Button, Input, Animation, List, DatePicker } from 'rsuite';
import { ArrowDown, ArrowUp } from '@rsuite/icons';
import CompProp from '../CompProp';


const switchInput = (str) => {
    switch (str) {
        case "Input": return Input;
        case "Date": return DatePicker;
        default: return Input;
    }
}


const SysComp = ({title, compProperties, removeButton, onValueUpdate}) => {
    const [isShown, setIsShown] = useState(true);

   
    const dispProperties = compProperties.map(val => {
        const name = Object.keys(val)[0];
        return <CompProp onChange={(e) => onValueUpdate(e, name)} InputType={switchInput(val[name].input)} id={name} title={name}/>
    })

    return (
        <List.Item className='mt-2' style={{padding: '5px'}}>
            <Button onClick={() => setIsShown(!isShown)} style={{padding: '1px', marginRight: '10px'}}>
                {isShown ?
                    <ArrowUp style={{fontSize: '1.5em'}}/>
                :   <ArrowDown style={{fontSize: '1.5em'}}/> }
            </Button>
            <span style={{fontSize: '16px', fontWeight: '800'}}>{title}</span>
            {removeButton}
            <Animation.Collapse in={isShown}>
            <ol className='hide-bullet'>
                {dispProperties}
            </ol>
            </Animation.Collapse>
        </List.Item>
    );
};

export default SysComp;
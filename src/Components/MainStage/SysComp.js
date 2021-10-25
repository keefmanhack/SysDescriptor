import React, {useState} from 'react';
import { Button, Input, Animation } from 'rsuite';
import { ArrowDown, ArrowUp } from '@rsuite/icons';
import CompProp from './CompProp';

const SysComp = ({title, compProperties}) => {
    const [isShown, setIsShown] = useState(true);


    console.log(compProperties);
    return (
        <div className='mt-2'>
            <Button onClick={() => setIsShown(!isShown)} style={{padding: '1px', marginRight: '10px'}}>
                {isShown ?
                    <ArrowUp style={{fontSize: '1.5em'}}/>
                :   <ArrowDown style={{fontSize: '1.5em'}}/> }
            </Button>
            <span style={{fontSize: '16px', fontWeight: '800'}}>{title}</span>
            <Animation.Collapse in={isShown}>
            <ol className='hide-bullet'>
                <CompProp
                    Input={Input}
                    id='p-num'
                    title='Part Number'
                />
            </ol>
            </Animation.Collapse>
        </div>
    );
};

export default SysComp;
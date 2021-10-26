import React, {useState} from 'react';
import { Button, Input, Animation, List } from 'rsuite';
import { ArrowDown, ArrowUp } from '@rsuite/icons';
import CompProp from './CompProp';

const SysComp = ({title, compProperties}) => {
    const [isShown, setIsShown] = useState(true);

    console.log(compProperties);
    return (
        <List.Item className='mt-2' style={{padding: '5px'}}>
            <Button onClick={() => setIsShown(!isShown)} style={{padding: '1px', marginRight: '10px'}}>
                {isShown ?
                    <ArrowUp style={{fontSize: '1.5em'}}/>
                :   <ArrowDown style={{fontSize: '1.5em'}}/> }
            </Button>
            <span style={{fontSize: '16px', fontWeight: '800'}}>{title}</span>
            <Button style={{float: 'right'}} size='xs' color='orange' appearance='subtle'>
                Remove
            </Button>
            <Animation.Collapse in={isShown}>
            <ol className='hide-bullet'>
                <CompProp
                    Input={Input}
                    id='p-num'
                    title='Part Number'
                />
            </ol>
            </Animation.Collapse>
        </List.Item>
    );
};

export default SysComp;
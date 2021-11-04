import React, {useState} from 'react';
import { Button, Animation, List} from 'rsuite';
import { ArrowDown, ArrowUp } from '@rsuite/icons';
import CompInput from '../CompInput';


const SysComp = ({title, compProperties, removeButton, onUpdated, rootPath}) => {
    const [isShown, setIsShown] = useState(true);

   
    const dispProperties = compProperties.map((val, i) => {
        const name = Object.keys(val)[0];
        const dbPath = `${rootPath}/${val[name].db}`
        return <li key={i}><CompInput dbPath={dbPath} onChange={(e) => onUpdated(dbPath, e)} inputType={val[name].input} id={name} title={name}/></li>
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
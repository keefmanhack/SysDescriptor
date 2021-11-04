import React, { useEffect, useState } from 'react';
import { List, TagPicker } from 'rsuite';
import SysComp from './SysComp/SysComp';


const SysGroup = ({data, title, onUpdated, rootPath}) => {
    const [options, setOptions] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);

    const dispOptionals = selectedOptions.map((opt, i) => {
        const name = Object.keys(opt)[0];
        return <SysComp rootPath={rootPath} onUpdated={(path, val) => onUpdated(path, val)} key={i} title={name} compProperties={opt[name]}/>    
    })

    const dispRequired = data.required.map((req, i) => {
        const name = Object.keys(req)[0];
        return <SysComp rootPath={rootPath} onUpdated={(path, val) => onUpdated(path, val)} key={i} title={name} compProperties={req[name]}/>
    })



    useEffect(() => {
        // what optional components exist
    }, [rootPath])

    useEffect(() => {
        const loadOptions =  () => {
            const temp = [];
            const opts = data.optional;
            for(let i =0; i<opts.length; i++){
                temp.push({value: opts[i],  label: Object.keys(opts[i])[0]});
            }
            setOptions(temp);
        }
        loadOptions();
    }, []);



    return (
        <div style={{}} className='p-2'>
            <h3 style={{textAlign: 'center'}}>{title}</h3>
            <hr/>
            <TagPicker 
                searchable={false} 
                onChange={(vals) => setSelectedOptions(vals)}
                onClean={() => setSelectedOptions([])}
                value={selectedOptions} 
                data={options} 
                placeholder='Select Optional'
                style={{cursor: 'pointer', width: '150px'}}
            />
            <List style={{boxShadow: 'none'}}>
                {dispRequired}
                {dispOptionals}
            </List>
        </div>
   );
};

export default SysGroup;
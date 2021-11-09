import React from 'react';
import { Button, Input, List } from 'rsuite';
import moment from 'moment';

import SysItem from './List/SysItem';
import { useSystems } from '../../Contexts/systems.context';
import {useMediaQuery, useWindowHeight} from '../../misc/customHooks'

// SysItem from './List/SysItem';

const selectedStyle = {
    borderLeft: '4px solid lightgreen',
    transition: '.1s'
}



const SideBar = ({onNew, onSysSelected, selectedID, onSysDeleted}) => {
    const TWO_DAYS_AGO = moment().clone().subtract(2, 'days').startOf('day');

    const isDesktop = useMediaQuery('(min-width: 992px)');
    const windowHeight = useWindowHeight();

    const systems = useSystems();

    

   return (
        <div className='br-r h-100 p-1 v-scroll' style={{height: isDesktop ? windowHeight  : '300px'}}>
            <Button onClick={onNew} style={{marginBottom: '10px', display: 'block'}} className='mr-0 ml-auto'>New</Button>
            <Input style={{width: '80%'}} className='mx-auto mb-3' placeholder='Search' size='md'/>
        
            <List hover>
                {systems && Object.keys(systems).map((val, i)=> {
                    const id = Object.keys(systems)[i]
                    const data = systems[id];
                    const isNew = moment(data.timestamp).isAfter(TWO_DAYS_AGO, 'd');
                    const isSelected = id === selectedID;
                    return <SysItem 
                        onSelected={()=>onSysSelected(id)}
                        onDeleted={() => onSysDeleted(id)}
                        isNew={isNew} 
                        key={i}
                        name={data.name} 
                        timestamp={data.timestamp} 
                        owner={data.owner} 
                        tech={data.tech}
                        style={isSelected ? selectedStyle : {}}
                    />
                })}
            </List>
        </div>
    )

}
export default SideBar;
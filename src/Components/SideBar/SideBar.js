import React, {useState} from 'react';
import { Button, ButtonGroup, ButtonToolbar, Input, List } from 'rsuite';
import moment from 'moment';

import SysItem from './List/SysItem';
import { useSystems } from '../../Contexts/systems.context';
import {useMediaQuery, useWindowHeight} from '../../misc/customHooks'

// SysItem from './List/SysItem';

const selectedStyle = {
    borderLeft: '4px solid lightgreen',
    transition: '.1s'
}

const findSearchResults = (systems, searchText) => {
    const sysIDs = Object.keys(systems);
    const resultIDs = sysIDs.filter(id => {
        const {name} = systems[id];
        if(!name){return false}
        return name.includes(searchText)
    })

    return resultIDs;
}

const SideBar = ({onNew, onSysSelected, selectedID, onSysDeleted}) => {
    const [newestSelected, setNewestSelected] = useState(true);
    const [searchText, setSearchText] = useState('');

    const TWO_DAYS_AGO = moment().clone().subtract(2, 'days').startOf('day');
    const isDesktop = useMediaQuery('(min-width: 992px)');
    const windowHeight = useWindowHeight();
    const systems = useSystems() || {};
    const systemIDs = Object.keys(systems);

    const searchedResultIDs = searchText === '' ? systemIDs :  findSearchResults(systems, searchText);

    searchedResultIDs.sort((a, b) => {
        const left = systems[a];
        const right = systems[b];
 
        if(!newestSelected){
            return moment.utc(left.timestamp).diff(moment.utc(right.timestamp))
        }
        return moment.utc(right.timestamp).diff(moment.utc(left.timestamp))
    });

   return (
        <div className='br-r h-100 p-1 v-scroll' style={{height: isDesktop ? windowHeight  : '300px'}}>
            <Button onClick={onNew} style={{marginBottom: '10px', display: 'block'}} className='mr-0 ml-auto'>New</Button>
            <Input onChange={(e) => setSearchText(e)} clearable style={{width: '80%'}} className='mx-auto mb-3' placeholder='Search' size='md'/>
            
            <ButtonToolbar style={{margin: '10px 20%'}}>
                <ButtonGroup justified>
                    <Button size='sm' onClick={()=>setNewestSelected(true)} appearance={newestSelected ? 'primary' : 'ghost'}>Newest</Button>
                    <Button size='sm' onClick={()=>setNewestSelected(false)} appearance={newestSelected ? 'ghost' : 'primary'}>Oldest</Button>
                </ButtonGroup>
            </ButtonToolbar>

            <hr/>
            
            <List hover autoScroll>
                {systems && searchedResultIDs.map(id => {
                    const {name, timestamp, owner, tech} = systems[id];
                    const isNew = moment(timestamp).isAfter(TWO_DAYS_AGO, 'd');
                    const isSelected = id === selectedID;
                    return <SysItem 
                        onSelected={()=>onSysSelected(id)}
                        onDeleted={() => onSysDeleted(id)}
                        isNew={isNew} 
                        key={id}
                        name={name} 
                        timestamp={timestamp} 
                        owner={owner} 
                        tech={tech}
                        style={isSelected ? selectedStyle : {}}
                    />
                })}
            </List>
            {searchedResultIDs.length===0 ? <span className='muted-c'>No Systems Were Found.</span> : null}
        </div>
    )

}
export default SideBar;
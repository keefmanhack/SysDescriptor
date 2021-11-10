import React, {useState} from 'react';
import { Button, ButtonGroup, ButtonToolbar, Input, InputGroup, List, Loader } from 'rsuite';
import moment from 'moment';
import { Close } from '@rsuite/icons';

import SysItem from './List/SysItem';
import { useSystems } from '../../Contexts/systems.context';
import {useMediaQuery} from '../../misc/customHooks'


const selectedStyle = {
    borderLeft: '4px solid lightgreen',
    transition: '.1s'
}

const findSearchResults = (systems, searchText) => {
    const sysIDs = Object.keys(systems);
    const resultIDs = sysIDs.filter(id => {
        const {name} = systems[id];
        if(!name){return false}
        return name.toLowerCase().includes(searchText.toLowerCase())
    })

    return resultIDs;
}

const SideBar = ({onNew, onSysSelected, selectedID, onSysDeleted}) => {
    const [newestSelected, setNewestSelected] = useState(true);
    const [searchText, setSearchText] = useState('');

    const TWO_DAYS_AGO = moment().clone().subtract(2, 'days').startOf('day');
    const isDesktop = useMediaQuery('(min-width: 1200px)');
    const {systems, isUpdating} = useSystems();
    const systemIDs = Object.keys(systems || {});

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
        <div className='br-r h-100 p-1' style={{}}>
            <Button color="blue" appearance='primary' onClick={onNew} style={{marginBottom: '10px', display: 'block'}} className='mr-0 ml-auto'>New</Button>
            <InputGroup style={{width: '80%'}} className='mx-auto'>
                <Input value={searchText} onChange={(e) => setSearchText(e)} clearable placeholder='Search' size='md'/>
                <InputGroup.Button onClick={()=>setSearchText('')}>
                    <Close/>
                </InputGroup.Button>
            </InputGroup>

            
            <ButtonToolbar style={{margin: '10px 20%'}}>
                <ButtonGroup justified>
                    <Button size='sm' onClick={()=>setNewestSelected(true)} appearance={newestSelected ? 'primary' : 'ghost'}>Newest</Button>
                    <Button size='sm' onClick={()=>setNewestSelected(false)} appearance={newestSelected ? 'ghost' : 'primary'}>Oldest</Button>
                </ButtonGroup>
            </ButtonToolbar>
            
            <div><strong>{systemIDs.length}</strong> Total Descriptions</div>
            <span><strong>{searchedResultIDs.length}</strong> Descriptions Shown</span>
            <hr/>
            <div className='v-scroll' style={{height: isDesktop ? '66vh' : '20vh'}}>
            {isUpdating ? <Loader/> : null}
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
                {searchedResultIDs.length===0 && !isUpdating ? <span className='muted-c'>No Systems Were Found.</span> : null}
            </div>
            
        </div>
    )

}
export default SideBar;
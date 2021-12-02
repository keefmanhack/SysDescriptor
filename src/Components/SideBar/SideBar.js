import React, {useState} from 'react';
import {Input, InputGroup, Loader, List} from 'rsuite';
import { Close } from '@rsuite/icons';

import { useSystems } from '../../Contexts/systems.context';
import {useMediaQuery} from '../../misc/customHooks'
import { System } from './System/System';
import NewSystemModal from './SystemModal/NewSystemModal';


// const selectedStyle = {
//     borderLeft: '4px solid lightgreen',
//     transition: '.1s'
// }

const findSearchResults = (systems, searchText) => {
    if(searchText===''){return systems}

    const results = systems.filter(sys => {
        const {title} = sys
        if(!title){return false}
        return title.toLowerCase().includes(searchText.toLowerCase())
    })

    return results;
}

const SideBar = ({onNewRevision, onRevSelected, sysSelectedID, revSelectedID}) => {
    const [searchText, setSearchText] = useState('');

    const isDesktop = useMediaQuery('(min-width: 1200px)');
    const {systems, isUpdating} = useSystems();

    const searchResults =  findSearchResults(systems, searchText);

 
   return (
        <div className='br-r h-100 p-1' style={{}}>
            <NewSystemModal/>
            <InputGroup style={{width: '80%'}} className='mx-auto'>
                <Input value={searchText} onChange={(e) => setSearchText(e)} placeholder='Search' size='md'/>
                <InputGroup.Button onClick={()=>setSearchText('')}>
                    <Close/>
                </InputGroup.Button>
            </InputGroup>

            <div style={{paddingLeft: '5px'}} className='mt-2'>
                <div><strong>{systems.length}</strong> Total Descriptions</div>
                <span><strong>{searchResults.length}</strong> Descriptions Shown</span>
            </div>
            <hr style={{marginTop: '5px', marginBottom: '5px'}}/>
            <div className='v-scroll' style={{height: isDesktop ? '66vh' : '20vh'}}>
            {isUpdating ? <Loader/> : null}
            <List hover autoScroll>
                {searchResults.map(sys => {
                    const {title, sysNumber, technician, owner, partNumber, id} = sys;
                    return <System
                        title={title}
                        owner={owner}
                        technician={technician}
                        sysNumber={sysNumber}
                        partNumber={partNumber}
                        revListID={id}
                        key={id}
                        isSelected={sysSelectedID===id}
                        revSelectedID={revSelectedID}
                        onNewRevision={()=>onNewRevision(id)}
                        onRevSelected={(revID)=>onRevSelected(id, revID)}
                    />
                })}
            </List>
                {searchResults.length===0 && !isUpdating ? <span className='muted-c'>No Systems Were Found.</span> : null}
            </div>
        </div>
    )

}
export default SideBar;
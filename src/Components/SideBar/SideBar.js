import React, {useState} from 'react';
import {Input, InputGroup, Loader, List} from 'rsuite';
import { Close } from '@rsuite/icons';

import { useSystems } from '../../Contexts/systems.context';
import {useMediaQuery} from '../../misc/customHooks'
import { System } from './List/System';
import NewSystemModal from './NewSystemModal';


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

const SideBar = () => {
    const [searchText, setSearchText] = useState('');

    const isDesktop = useMediaQuery('(min-width: 1200px)');
    const {systems, isUpdating} = useSystems();

    const searchResults =  findSearchResults(systems, searchText);


    const onEdit = () => {
        console.log('adskfjadslkfj')
    }

 
   return (
        <div className='br-r h-100 p-1' style={{}}>
            <NewSystemModal/>
            <InputGroup style={{width: '80%'}} className='mx-auto'>
                <Input value={searchText} onChange={(e) => setSearchText(e)} clearable placeholder='Search' size='md'/>
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
                {searchResults.map((sys, i) => {
                    const {title, sysNumber, technician, owner} = sys;
                    return <System
                        title={title}
                        owner={owner}
                        technician={technician}
                        sysNumber={sysNumber}
                        key={i}
                        onSelect={(x)=>{
                            switch(x){
                                case 2: onEdit();break;
                                default: ;
                            }
                        }}
                    />
                })}
            </List>
                {searchResults.length===0 && !isUpdating ? <span className='muted-c'>No Systems Were Found.</span> : null}
            </div>
        </div>
    )

}
export default SideBar;
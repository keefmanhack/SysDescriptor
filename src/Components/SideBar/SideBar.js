import React from 'react';
import { Button, Input, List } from 'rsuite';
import SysItem from './List/SysItem';
import { useSystems } from '../../Contexts/systems.context';
import {useMediaQuery, useWindowHeight} from '../../misc/customHooks'
// SysItem from './List/SysItem';

const styles = {
}

const SideBar = ({onNew}) => {
    const isDesktop = useMediaQuery('(min-width: 992px)');
    const windowHeight = useWindowHeight();

    const systems = useSystems();

    

   return (
        <div className='br-r h-100 p-1 v-scroll' style={{...styles, height: isDesktop ? windowHeight  : '300px'}}>
            <Button onClick={onNew} style={{marginBottom: '10px', display: 'block'}} className='mr-0 ml-auto'>New</Button>
            <Input style={{width: '80%'}} className='mx-auto mb-3' placeholder='Search' size='md'/>

            <List hover>
                {systems && Object.keys(systems).map((val, i)=> {
                    const data = systems[Object.keys(systems)[i]];
                    return <SysItem key={i} name={data.name} timestamp={data.timestamp} owner={data.owner} tech={data.tech} />
                })}
            </List>
        </div>
    )

}
export default SideBar;
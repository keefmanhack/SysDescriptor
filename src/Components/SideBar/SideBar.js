import React from 'react';
import { Button, Input, List } from 'rsuite';
import {useMediaQuery, useWindowHeight} from '../../misc/customHooks'
import SysItem from './List/SysItem';

const styles = {
}

const SideBar = () => {

    const isDesktop = useMediaQuery('(min-width: 992px)');
    const windowHeight = useWindowHeight();

   return (
        <div className='br-r h-100 p-1 v-scroll' style={{...styles, height: isDesktop ? windowHeight  : '300px'}}>
            <Button style={{marginBottom: '10px', display: 'block'}} className='mr-0 ml-auto'>New</Button>
            <Input style={{width: '80%'}} className='mx-auto mb-3' placeholder='Search' size='md'/>

            <List hover>
                <SysItem/>
                <SysItem/>
                <SysItem/>
            </List>
        </div>
    )

}
export default SideBar;
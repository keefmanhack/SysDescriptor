import React from 'react';
import {version} from '../../package.json';

const styles = {
   
}

const TitleBar = () => 
    (
        <div className='title-bar w-100' style={styles}>
            <h2 className='px-5'>SysDescriptor {version}</h2> 
            <hr className='mt-1 mb-0'/> 
        </div>
    )
export default TitleBar;
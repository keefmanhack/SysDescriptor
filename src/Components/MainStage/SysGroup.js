import React from 'react';
import { List } from 'rsuite';
import CustomSelectPicker from '../CustomSelectPicker';
import SysComp from './SysComp';


const SysGroup = ({title}) => {
    console.log();
    return (
        <div style={{}} className='p-2'>
            <h3 style={{textAlign: 'center'}}>{title}</h3>
            <hr/>
            <CustomSelectPicker placement="autoHorizontalStart" />
            <List  style={{boxShadow: 'none'}}>
                <SysComp title='ATC RSSM' compProperties=''/>
                <SysComp title='ACSES RSSM' compProperties=''/>
            </List>
        </div>
   );
};

export default SysGroup;
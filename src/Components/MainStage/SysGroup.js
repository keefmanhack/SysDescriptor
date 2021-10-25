import React from 'react';
import CustomSelectPicker from '../CustomSelectPicker';
import SysComp from './SysComp';


const SysGroup = ({title}) => {
    console.log();
    return (
        <div style={{backgroundColor: 'black'}} className='p-2'>
            <h3 style={{textAlign: 'center'}}>{title}</h3>
            <hr/>
            <CustomSelectPicker placement="autoHorizontalStart" />
            <SysComp title='ATC RSSM' compProperties=''/>
            <SysComp title='ACSES RSSM' compProperties=''/>
        </div>
   );
};

export default SysGroup;
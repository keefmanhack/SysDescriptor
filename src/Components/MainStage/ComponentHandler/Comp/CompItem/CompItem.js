import React from 'react';
import CustomPanel from '../../../../../misc/CustomPanel';
import SoftInput from './SoftInput';

const CompItem = ({i, format, compID}) => {    
    const dispSoftwareData = () => {
        if(!format || !format.Software){return null}
        
        const dataTitles = Object.keys(format.Software);
        return dataTitles.map(title => {
            return (
                <SoftInput title={title} key={title} compID={compID}/>
            )
        })
    }


    return (
        <CustomPanel defaultExpand header={i}>
                {dispSoftwareData()}
        </CustomPanel>
    );
};

export default CompItem;
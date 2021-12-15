import React from 'react';
import CustomPanel from '../../../../../misc/CustomPanel';
import DBInput from '../../../SubComponents/DBInput/DBInput';

const CompItem = ({i, format}) => {
    const dispSoftwareData = () => {
        if(!format.Software){return null}
        
        const dataTitles = Object.keys(format.Software);
        return dataTitles.map(title => {
            return (
                <DBInput key={title} title={title} InputType={format.Software[title].input}/>
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
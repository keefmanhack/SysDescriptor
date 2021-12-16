import React from 'react';
import { Button, Loader } from 'rsuite';
import { ComponentItemDB } from '../../../../Database/SystemDB/RevisionDB/SubSystemDB/ComponentDB/ComponentItemDB/ComponentItemDB';
import { useCompItems } from '../../../../misc/customHooks';
import CustomPanel from '../../../../misc/CustomPanel';
import CompItem from './CompItem/CompItem';

const Comp = ({name, id, format}) => {
    const {compItems, isUpdating} = useCompItems(id);

    const showCompItems = () => {
        if(isUpdating){return <Loader/>}
        if(!compItems.length){return "Add new items"}

        return compItems.map((v, i) => {
            const {id} = v;
            return <CompItem compID={id} key={i} i={i} format={format}/>
        })
    }

    const newCompItem = async () => {
        await ComponentItemDB.create(id);
    }


    return (
        <CustomPanel defaultExpand header={name}>
            <Button size='xs' color='blue' appearance='primary' onClick={newCompItem}>Add</Button>
            <hr/>
            {showCompItems()}
        </CustomPanel>
    );
};

export default Comp;
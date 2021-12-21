import React from 'react';
import { Button, Loader } from 'rsuite';
import { useToolBar } from '../../../../../Contexts/toolbar.context';
import { ComponentItemDB } from '../../../../../Database/SystemDB/RevisionDB/SubSystemDB/ComponentDB/ComponentItemDB/ComponentItemDB';
import Alert from '../../../../../misc/Alert';
import CustomPanel from '../../../../misc/Custom Panel/CustomPanel';
import { GridHeader } from '../../../../misc/Custom Panel/GridHeader';
import { useCompItems } from '../../../../../misc/customHooks';
import { dispTime } from '../../../../../misc/helperfunc';
import CompItem from './CompItem/CompItem';

const Comp = ({name, birthdate, compID, format}) => {
    const {compItems, isUpdating} = useCompItems(compID);
    const {setIsUpdating} = useToolBar();

    const showCompItems = () => {
        if(isUpdating){return <Loader/>}
        if(!compItems.length){return "Add new items"}

        return compItems.map((v, i) => {
            const {id, birthdate} = v;
            return <CompItem birthdate={birthdate} parentID={compID} itemID={id} key={id} name={i+1} format={format}/>
        })
    }

    const newCompItem = async () => {
        setIsUpdating(true);
        try{
            await ComponentItemDB.create(compID);
            Alert.success('Successfully created new component item')
        }catch(err){
            Alert.error(err);
        }
        setIsUpdating(false);
    }

    return (
        <CustomPanel defaultExpand header={name}>
            <GridHeader
                dataChildren={
                    <div>
                        <div>{compItems ? compItems.length : 0} items</div>
                        <span>{dispTime(birthdate)}</span>
                    </div>
            }
                actionChildren={<Button size='xs' color='blue' appearance='ghost' onClick={newCompItem}>Add</Button>}
            />
            <hr style={{marginTop: '5px'}}/>
            {showCompItems()}
        </CustomPanel>
    );
};

export default Comp;
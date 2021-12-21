import React, { useState } from 'react';
import { Button } from 'rsuite';
import { useToolBar } from '../../../../../../Contexts/toolbar.context';
import { ComponentDB } from '../../../../../../Database/SystemDB/RevisionDB/SubSystemDB/ComponentDB/ComponentDB';
import Alert from '../../../../../../misc/Alert';
import CompDeleteModal from './CompDeleteModal';

const ActiveComp = ({name, id, subSysID}) => {
    const [showModal, setShowModal] = useState(false);
    const {setIsUpdating} = useToolBar();

    const handleDelete = async () => {
        setIsUpdating(true);
        setShowModal(false);
        try{
            await ComponentDB.deleteSpecific(subSysID, id);
            Alert.success(`Successfully deleted ${name}`)
        }catch(err){
            Alert.error(err);
        }
        setIsUpdating(false)
    }

     return (
        <>
            <Button color='green' appearance='primary' size='xs' onClick={()=>setShowModal(true)}> - {name} </Button>
            <CompDeleteModal show={showModal} name={name} id={id} onClose={()=>setShowModal(false)} onDelete={handleDelete}/>
        </>
    );
};

export default ActiveComp;
import React, { useState } from 'react';
import { Button } from 'rsuite';
import { useToolBar } from '../../../../../../Contexts/toolbar.context';
import { ComponentDB } from '../../../../../../Database/SystemDB/RevisionDB/SubSystemDB/ComponentDB/ComponentDB';
import Alert from '../../../../../../misc/Alert';
import HoverShowAll from '../../../../../misc/Helper Components/HoverShowAll';
import CompDeleteModal from './CompDeleteModal';

const ActiveComp = ({name, id, subSysID, style}) => {
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

            <Button style={style} color='green' appearance='primary' size='xs' onClick={()=>setShowModal(true)}>
                <HoverShowAll text={name}>
                    <span className='ellip-overflow'>
                        - {name} 
                    </span>
                </HoverShowAll>
            </Button>
            <CompDeleteModal show={showModal} name={name} id={id} onClose={()=>setShowModal(false)} onDelete={handleDelete}/>
        </>
    );
};

export default ActiveComp;
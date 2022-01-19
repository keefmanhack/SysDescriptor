import React, { useState } from 'react';
import { Button } from 'rsuite';
import { useToolBar } from '../../../../../../Contexts/toolbar.context';
import { ComponentDB } from '../../../../../../Database/SystemDB/RevisionDB/SubSystemDB/ComponentDB/ComponentDB';
import Alert from '../../../../../../misc/Alert';
import DeleteModal from '../../../../../misc/DeleteModal';
import HoverShowAll from '../../../../../misc/Helper Components/HoverShowAll';

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
            <DeleteModal
                title={`Delete Component ${name}?`}
                body={
                    <p>
                        Are you sure you want to delete the <strong>{name}</strong> component?
                    </p>
                }
                handleClose={()=>setShowModal(false)}
                show={showModal}
                handleDelete={handleDelete}

            />
        </>
    );
};

export default ActiveComp;
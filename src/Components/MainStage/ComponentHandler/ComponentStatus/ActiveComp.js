import React, { useState } from 'react';
import { Button } from 'rsuite';
import { ComponentDB } from '../../../../Database/SystemDB/RevisionDB/SubSystemDB/ComponentDB/ComponentDB';
import CompDeleteModal from './CompDeleteModal';

const ActiveComp = ({name, id, subSysID}) => {
    const [showModal, setShowModal] = useState(false);
     return (
        <>
            <Button color='green' appearance='primary' size='xs' onClick={()=>setShowModal(true)}> - {name} </Button>
            <CompDeleteModal show={showModal} name={name} id={id} onClose={()=>setShowModal(false)} onDelete={() => {setShowModal(false); ComponentDB.deleteSpecific(subSysID, id)}}/>
        </>
    );
};

export default ActiveComp;
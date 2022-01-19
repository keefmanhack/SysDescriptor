import React from 'react';
import { SystemDB } from '../../../Database/SystemDB/SystemDB';
import Alert from '../../../misc/Alert';
import SystemModal from './SystemModal';



const NewSystemModal = ({handleClose, show}) => {
    return (
        <SystemModal
            title='Create New System'
            handleClose={handleClose}
            show={show}
            submitFunc={async (title, partNumber, sysNumber, technician, owner) => {
                try{
                    await SystemDB.create(title, owner, technician, sysNumber, partNumber);
                    Alert.success('Successfully created new system');
                }catch(e){
                    Alert.error('Unable to create new system');
                }
            }}
        />
    )
}

export default NewSystemModal;
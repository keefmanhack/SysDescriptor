import React from 'react';
import { SystemDB } from '../../../Database/SystemDB/SystemDB';
import Alert from '../../../misc/Alert';
import SystemModal from './SystemModal';
import systemChoices from '../../../misc/SystemChoices/systemChoices.json';


const getSysIndex = (title) => {
   const item = systemChoices.systems.find(v => v.data.title === title);
   return item.value;
}


const EditSystemModal = ({defOwner='', defTechnician='', title, show, handleClose, sysID}) => {
    return (
        <SystemModal
            defOwner={defOwner}
            defTechnician={defTechnician}
            defSysIndex={getSysIndex(title)}
            title={`Update ${title} System`}
            show={show}
            handleClose={handleClose}
            submitFunc={async (title, partNumber, sysNumber, technician, owner) => {
                try{
                    await SystemDB.update(sysID, title, owner, technician, sysNumber, partNumber);
                    Alert.success('Successfully updated system');
                }catch(e){
                    Alert.error('Unable to update system')
                }
            }}
        />
    )
}

export default EditSystemModal;
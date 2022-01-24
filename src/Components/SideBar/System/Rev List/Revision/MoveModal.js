import React, { useState } from 'react'
import { Button, Form, InputPicker, Modal } from 'rsuite'
import Alert from '../../../../../misc/Alert';
import { useSystems } from '../../../../../misc/customHooks';


const createDataLabelObj = (sys, curSysID) => {
    if(!curSysID || !sys || !sys.length===0){return [];}

    const returnVal = [];
    for(let i =0; i<sys.length; i++){
        const iSys = sys[i];
        if(iSys.id !== curSysID){
            returnVal.push({
                "label": iSys.title,
                "value" : iSys.id
            });
        }
    }

    return returnVal;
}


const MoveModal = ({show, handleClose, handleMove, revName, curSysID}) => {
    const [selI, setSelI] = useState(null);
    const {systems, isUpdating} = useSystems();
    const transPosSys = createDataLabelObj(systems, curSysID);

    const localHandleMove = () => {
        if(!selI){
            Alert.error('Select a system to move the revision');
        }

        handleMove();
    }

    

    return (
        <Modal open={show} onClose={handleClose} size='xs'>
            <Modal.Header>
                <Modal.Title>Move {revName} Revision</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="systemsDropDown">
                        <Form.ControlLabel>Select System</Form.ControlLabel>
                        <InputPicker 
                            data={transPosSys} 
                            disabled={isUpdating}
                            onClean={()=>setSelI(null)}
                            onChange={(i)=>{setSelI(i)}}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={localHandleMove} type='submit' appearance='primary'>Move</Button>
                <Button onClick={handleClose} appearance='subtle'>Cancel</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default MoveModal;

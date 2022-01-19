import React, {useState} from 'react';
import { Button, Form, InputPicker, Modal, Input, Grid, Row, Col, ButtonToolbar, Schema} from 'rsuite';
import systemChoices from '../../../misc/SystemChoices/systemChoices.json';


const validationModel  = Schema.Model({
    System: Schema.Types.NumberType().min(0, "This value is required")
})

const SystemModal = ({defOwner='', defTechnician='', defSysIndex=null, title, show, handleClose, submitFunc}) => {
    const [selectedSystemIndex, setSelectedSystemIndex] = useState(defSysIndex);
    const [owner, setOwner] = useState(defOwner);
    const [technician, setTechnician] = useState(defTechnician);

    const clearInputs = () => {
        setSelectedSystemIndex(null); setTechnician(''); setOwner('');
    }

    const handleSubmit = () => {
        if(validationModel.check({System: selectedSystemIndex})){
            const sysParent = systemChoices.systems[selectedSystemIndex].data;
            const {title, partNumber, sysNumber} = sysParent;
            submitFunc(title, partNumber, sysNumber, technician, owner);
            clearInputs();
            handleClose();
        }
    }

    return (
        <Modal size='xs' open={show} onClose={handleClose}>
            <Modal.Header><Modal.Title>{title}</Modal.Title></Modal.Header>
            <Modal.Body>
                <Form fluid model={validationModel} onSubmit={handleSubmit}>
                    <Form.Group controlId='System' style={{marginBottom: '10px'}}>
                        <Form.ControlLabel>Title</Form.ControlLabel>
                            <Form.Control
                                value={selectedSystemIndex}
                                onChange={(e) => {
                                   setSelectedSystemIndex(e)
                                }} 
                                size='lg' 
                                placeholder='LDL, HST, ...' 
                                accepter={InputPicker}
                                data={systemChoices.systems}
                                name='System'
                            />
                    </Form.Group>
                    <Grid style={{padding: 0}} fluid>
                        <Row>
                            <Col xs={12}>
                                <Form.Group>
                                    <Form.ControlLabel style={{fontSize: '16px'}}>Technician</Form.ControlLabel>
                                    <Form.Control name='technician' value={technician} onChange={(e) => setTechnician(e)} size='sm' accepter={Input} />
                                </Form.Group>
                            </Col>
                            <Col xs={12}>
                                <Form.Group>
                                    <Form.ControlLabel style={{fontSize: '16px'}}>Owner</Form.ControlLabel>
                                    <Form.Control name='owner' value={owner} onChange={(e) => setOwner(e)} size='sm' accepter={Input} />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Grid>
                    <Form.Group>
                        <ButtonToolbar className='mt-3'>
                            <Button type='submit' appearance='primary'>{title}</Button>
                            <Button onClick={handleClose} appearance='subtle'>Cancel</Button>
                        </ButtonToolbar>
                    </Form.Group>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default SystemModal;
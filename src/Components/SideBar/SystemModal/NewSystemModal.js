import { push, ref } from 'firebase/database';
import React, {useState} from 'react';
import { Button, Form, InputNumber, InputPicker, Modal, Input, Grid, Row, Col, ButtonToolbar, Schema} from 'rsuite';
import Alert from '../../../misc/Alert';
import database from '../../../misc/firebase';
import systemChoices from '../../../misc/SystemChoices/systemChoices.json';


const validationModel  = Schema.Model({
    System: Schema.Types.NumberType().isRequired("This property is required"),
})

const NewSystemModal = () => {
    const [selectedSystemIndex, setSelectedSystemIndex] = useState(5);
    const [owner, setOwner] = useState('');
    const [technician, setTechnician] = useState('');
    const [utfNumber, setutfNumber] = useState(0);
    const [show, setShow] = useState(false);

    const clearInputs = () => {
        setSelectedSystemIndex(null); setTechnician(''); setOwner(''); setutfNumber(0);
    }

    const onNewSystem = async () => {
        if(!selectedSystemIndex){return}
        const newRef = ref(database, `systems/`);
        const sysParent = systemChoices.systems[selectedSystemIndex].data;
        const {title, partNumber, sysNumber} = sysParent;
        try{
            const data = {
                title,
                technician,
                owner,
                utfNumber,
                sysNumber,
                partNumber 
            }
            await push(newRef, data);
            clearInputs();
            setShow(false);
            Alert.success(`New System ${title} Created`);
        }catch(err){
            Alert.error(err);
            console.log(err);
        }
    }
    
    return (
    <>
        <Button color="blue" appearance='primary' onClick={()=> setShow(true)} style={{marginBottom: '10px', display: 'block'}} className='mr-0 ml-auto'>New System</Button>
        <Modal size='xs' open={show} onClose={()=>setShow(false)}>
            <Modal.Header><Modal.Title>New System</Modal.Title></Modal.Header>
            <Modal.Body>
                <Form fluid model={validationModel} onSubmit={()=> onNewSystem()}>
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
                    <Form.Group style={{marginBottom: '10px'}}>
                        <Form.ControlLabel style={{fontSize: '14px'}}>UTF Number</Form.ControlLabel>
                        <Form.Control value={utfNumber} onChange={(e) => setutfNumber(e)} size='xs' style={{width: '80px'}} placeholder={0} min={0} scrollable defaultValue={0} accepter={InputNumber} />
                    </Form.Group>
                    <Grid style={{padding: 0}} fluid>
                        <Row>
                            <Col xs={12}>
                                <Form.Group>
                                    <Form.ControlLabel style={{fontSize: '16px'}}>Technician</Form.ControlLabel>
                                    <Form.Control value={technician} onChange={(e) => setTechnician(e)} size='sm' accepter={Input} />
                                </Form.Group>
                            </Col>
                            <Col xs={12}>
                                <Form.Group>
                                    <Form.ControlLabel style={{fontSize: '16px'}}>Owner</Form.ControlLabel>
                                    <Form.Control value={owner} onChange={(e) => setOwner(e)} size='sm' accepter={Input} />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Grid>
                    <Form.Group>
                        <ButtonToolbar className='mt-3'>
                            <Button type='submit' appearance='primary'>Create New System</Button>
                            <Button onClick={()=>setShow(false)} appearance='subtle'>Cancel</Button>
                        </ButtonToolbar>
                    </Form.Group>
                </Form>
            </Modal.Body>
        </Modal>
    </>
    )
}

export default NewSystemModal;
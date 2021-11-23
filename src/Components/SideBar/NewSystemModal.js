import { push, ref } from 'firebase/database';
import React, {useState} from 'react';
import { Button, Form, InputNumber, InputPicker, Modal, Input, Grid, Row, Col, Whisper, Tooltip } from 'rsuite';
import { useSystems } from '../../Contexts/systems.context';
import Alert from '../../misc/Alert';
import database from '../../misc/firebase';


const filterAndFormat = systems => {
    const arr = [];
    for(let i = 0; i<systems.length; i++){
        const {title} = systems[i];
        if(title){
            arr.push({value: title, label: title});
        }
    }
    return arr;
}

const removeDuplicates = a => {
    const seen = {};
    const out = [];
    const len = a.length;
    let j = 0;
    for(let i = 0; i < len; i++) {
         const item = a[i].value;
         if(seen[item] !== 1) {
               seen[item] = 1;
               out[j++] = a[i];
         }
    }
    return out;
}


const NewSystemModal = () => {
    const [title, setTitle] = useState('');
    const [technician, setTechnician] = useState('');
    const [owner, setOwner] = useState('');
    const [utfNumber, setutfNumber] = useState(0);
    const [sysNumber, setSysNumber] = useState(0);
    const [show, setShow] = useState(false);
    const [newSystems, setNewSystems] = useState([]);
    
    const {systems} = useSystems();
    const sysTitles = filterAndFormat(systems);
    const clearInputs = () => {
        setTitle(''); setTechnician(''); setOwner(''); setutfNumber(0); setSysNumber(0);
    }

    const onNewSystem = async () => {
        const newRef = ref(database, `systems/`);
        try{
            const data = {
                title,
                technician,
                owner,
                utfNumber,
                sysNumber 
            }
            await push(newRef, data);
            clearInputs();
            setShow(false);
            Alert.success(`New System ${title !=='' ? title : 'Untitled'} Created`);
        }catch(err){
            Alert.error(err);
            console.log(err);
        }
    }


    console.log(newSystems);
    return (
    <>
        <Button color="blue" appearance='primary' onClick={()=> setShow(true)} style={{marginBottom: '10px', display: 'block'}} className='mr-0 ml-auto'>New System</Button>
        <Modal size='xs' open={show} onClose={()=>setShow(false)}>
            <Modal.Header><Modal.Title>New System</Modal.Title></Modal.Header>
            <Modal.Body>
                <Form fluid>
                    <Form.Group style={{marginBottom: '10px'}}>
                        <Form.ControlLabel>Title</Form.ControlLabel>
                        <Whisper placement='top' trigger='active' speaker={<Tooltip>Type to create a new system name</Tooltip>}>
                            <Form.Control 
                                value={title} 
                                onChange={(e) => setTitle(e)} 
                                size='lg' 
                                placeholder='LDL, HST, ...' 
                                accepter={InputPicker}
                                data={removeDuplicates([...sysTitles, ...newSystems])}  
                                creatable
                                onCreate={(value)=> setNewSystems(v => 
                                    v.concat([{value, label: value}])
                                )}
                            />
                        </Whisper>
                    </Form.Group>
                    <Grid fluid className='mb-2'>
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
                    <Grid fluid className='mb-2'>
                        <Row>
                            <Col xs={12}>
                                <Form.Group>
                                    <Form.ControlLabel style={{fontSize: '14px'}}>System Number</Form.ControlLabel>
                                    <Form.Control value={sysNumber} onChange={(e) => setSysNumber(e)} size='xs' style={{width: '80px'}} placeholder={0} min={0} scrollable defaultValue={0} accepter={InputNumber} />
                                </Form.Group>
                            </Col>
                            <Col xs={12}>
                                <Form.Group>
                                    <Form.ControlLabel style={{fontSize: '14px'}}>UTF Number</Form.ControlLabel>
                                    <Form.Control value={utfNumber} onChange={(e) => setutfNumber(e)} size='xs' style={{width: '80px'}} placeholder={0} min={0} scrollable defaultValue={0} accepter={InputNumber} />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Grid>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={()=>onNewSystem()} appearance='primary'>Create New System</Button>
                <Button onClick={()=>setShow(false)} appearance='subtle'>Cancel</Button>
            </Modal.Footer>
        </Modal>
    </>
    )
}

export default NewSystemModal;
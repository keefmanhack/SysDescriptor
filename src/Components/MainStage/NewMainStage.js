import React, { useEffect, useRef, useState } from 'react';
import { Grid, Row, Col, Button, Input, Loader } from 'rsuite';
import {set, ref, get} from 'firebase/database';
import database from '../../misc/firebase';

import SysGroup from './SubComponents/SysGroup';
import MainStage from './MainStage';
import sysData from '../../misc/dataFormat.json';

const NewMainStage = ({sysID}) => {
    const nameRef = useRef();
    const ownerRef = useRef();
    const techRef = useRef();
    const [isUpdating, setIsUpdating] = useState(true);
    const [general, setGeneral] = useState({});

    const resetInputs = () => {
        nameRef.current.value = "";
        ownerRef.current.value = "";
        techRef.current.value = "";
    }

    useEffect(() => {
        const loadGeneral = async () => {
            setIsUpdating(true);
            setGeneral({});
            resetInputs();

            const systemsRef = ref(database, `systems/${sysID}`);
            try{
                const snap = await get(systemsRef); 
                setGeneral(snap.val())
                console.log(general);
            }catch(err){
                alert(err);
            }
            setIsUpdating(false);
        }   

        loadGeneral();

    }, [sysID])

    const updateGeneral = async (path, val) => {
        setIsUpdating(true);
        general[path] = val;
        setGeneral(general);
        const db = ref(database, `systems/${sysID}/${path}`);
        try{
            
          await set(db, val)
        }catch(err){
          alert(err); 
        }
        setIsUpdating(false);
    }

    return (
        <MainStage
            newStageComp={
                <>
                    <div className='p-1 w-100'>
                            <Button color='blue' appearance="primary" className='mr-3'>Generate File</Button>
                            <Button color='red' appearance="subtle" className=''>Reset</Button>
                            {isUpdating ? <Loader style={{float: 'right', marginRight: '10px'}} speed="fast" size="md"/> : null}
                    </div>
                    <div style={{width: '40%'}} className='mx-auto mb-3'>
                        <label htmlFor='sys-name'>System Name</label>
                        <Input
                            ref={nameRef} 
                            value={general.name} 
                            onChange={(e) => {updateGeneral(sysData.general.name.db, e)}} 
                            id='sys-name'style={{ fontSize: '32px'}} placeholder='LDL, HST, etc...'/>
                    </div>
                    <Grid fluid>
                        <Row>
                            <Col xs={12}>
                            <div style={{width: '50%'}} className='mx-auto mb-3'>
                                <label htmlFor='tech'>Technician</label>
                                <Input ref={techRef} value={general.tech} onChange={(e) => {updateGeneral(sysData.general.technician.db, e)}} id='tech' className='mx-auto' style={{ fontSize: '24px'}} placeholder='John Smith'/>
                            </div>  
                            </Col>
                            <Col xs={12}>
                                <div style={{width: '50%'}} className='mx-auto mb-3'>
                                    <label htmlFor='own'>Owner</label>
                                    <Input ref={ownerRef} value={general.owner} onChange={(e) => {updateGeneral(sysData.general.owner.db, e)}} id='own' className='mx-auto' style={{ fontSize: '24px'}} placeholder='John Smith'/>
                                </div> 
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={8}>
                                <SysGroup data={sysData.system} onGroupUpdated={(e, path) => updateGeneral(e, `${path},system`)} title='System'/>
                            </Col>
                            <Col xs={8}>
                                <SysGroup data={sysData.atc} onGroupUpdated={(e, path) => updateGeneral(e, `${path},atc`)} title='ATC'/>
                            </Col>
                            <Col xs={8}>
                                <SysGroup data={sysData.acses} onGroupUpdated={(e, path) => updateGeneral(e, `${path},acses`)} title='ACSES'/>
                            </Col>
                        </Row>
                    </Grid>
                </>
            }
        />
    );
};

export default NewMainStage;
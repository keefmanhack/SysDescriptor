import React, {useState, useEffect } from 'react';
import { Grid, Row, Col, Button, Loader } from 'rsuite';
import {set, ref, get} from 'firebase/database';
import database from '../../misc/firebase';

import SysGroup from './SubComponents/SysGroup';
import MainStage from './MainStage';
import sysData from '../../misc/dataFormat.json';
import CompInput from './SubComponents/CompInput';

const NewMainStage = ({sysID}) => {
    const [isUpdating, setIsUpdating] = useState(true);
    const [general, setGeneral] = useState({});


    useEffect(() => {
        const loadGeneral = async () => {
            setIsUpdating(true);
            setGeneral({});
            const systemsRef = ref(database, `systems/${sysID}`);
            try{
                const snap = await get(systemsRef); 
                setGeneral(snap.val())
            }catch(err){
                alert(err);
            }
            setIsUpdating(false);
        }   

        loadGeneral();

    }, [sysID])

    const updateGeneralDB = async (path, val) => {
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

    const updateSubComp = async (path, val) => {
        setIsUpdating(true);
        const db = ref(database, path);
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
                        <CompInput 
                            onChange={(e) => {updateGeneralDB(sysData.general.name.db, e)}}
                            dbPath={`systems/${sysID}/${sysData.general.name.db}`}
                            title="System Name" 
                            inputType="Text" 
                            id='name' 
                            style={{ fontSize: '32px'}} 
                            placeholder='LDL, HST, etc...'
                        />
                    </div>
                    <Grid fluid>
                        <Row>
                            <Col xs={12}>
                            <div style={{width: '50%'}} className='mx-auto mb-3'>
                                <CompInput 
                                    onChange={(e) => {updateGeneralDB(sysData.general.technician.db, e)}}
                                    dbPath={`systems/${sysID}/${sysData.general.technician.db}`}
                                    title="Technician" 
                                    inputType="Text" 
                                    id='tech' 
                                    style={{ fontSize: '24px'}} 
                                    placeholder='John Smith'
                                />
                            </div>  
                            </Col>
                            <Col xs={12}>
                                <div style={{width: '50%'}} className='mx-auto mb-3'>
                                    <CompInput 
                                        onChange={(e) => {updateGeneralDB(sysData.general.owner.db, e)}}
                                        dbPath={`systems/${sysID}/${sysData.general.owner.db}`}
                                        title="Owner" 
                                        inputType="Text" 
                                        id='owner' 
                                        style={{ fontSize: '24px'}} 
                                        placeholder='John Smith'
                                        className='mx-auto'
                                    />
                                </div> 
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={8}>
                                <SysGroup rootPath={`system/${general.system}`} data={sysData.system} onUpdated={(path, e) => updateSubComp(path, e)} title='System'/>
                            </Col>
                            <Col xs={8}>
                                <SysGroup rootPath={`atc/${general.atc}`} data={sysData.atc} onUpdated={(path, e) => updateSubComp(path, e)} title='ATC'/>
                            </Col>
                            <Col xs={8}>
                                <SysGroup rootPath={`acses/${general.acses}`} data={sysData.acses} onUpdated={(path, e) => updateSubComp(path, e)} title='ACSES'/>
                            </Col>
                        </Row>
                    </Grid>
                </>
            }
        />
    );
};

export default NewMainStage;
import React, {useState, useEffect } from 'react';
import { Grid, Row, Col, Button } from 'rsuite';
import {set, ref, get} from 'firebase/database';
import database from '../../misc/firebase';

import SysGroup from './SubComponents/SysGroup';
import MainStage from './MainStage';
import sysData from '../../misc/dataFormat.json';
import CompInput from './SubComponents/CompInput';
import SavedIndicator from '../../misc/SavedIndicator';
import Alert from '../../misc/Alert';
import { generateDocument } from '../../misc/helperfunc';

const NewMainStage = ({sysID, style}) => {
    const [isUpdating, setIsUpdating] = useState(false);
    const [general, setGeneral] = useState({});


    useEffect(() => {
        const loadGeneral = async () => {
            setGeneral({});
            const systemsRef = ref(database, `systems/${sysID}`);
            try{
                const snap = await get(systemsRef); 
                setGeneral(snap.val())
            }catch(err){
                console.log(err);
                alert(err);
            }
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
          Alert.error(`Error writing general system data of ${val} to the cloud`);
        }
        setIsUpdating(false);
    }

    const updateSubComp = async (path, val) => {
        setIsUpdating(true);
        const db = ref(database, path);
        try{
            await set(db, val)
        }catch(err){
            Alert.error(`Error writing system data of ${val} to the cloud`);
        }
        setIsUpdating(false);
    }



    return (
        <MainStage
            style={style}
            newStageComp={
                <>
                    <div className='p-1 w-100'>
                            <Button onClick={()=>generateDocument()} color='green' appearance="primary" className='mr-3'>Generate File</Button>
                            <SavedIndicator isUpdating={isUpdating} style={{float: 'right', marginRight: '10px'}}/>
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
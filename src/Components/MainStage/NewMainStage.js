import React, {useState, useEffect } from 'react';
import { Grid, Row, Col, Button } from 'rsuite';
import {set, ref, get} from 'firebase/database';

import database from '../../misc/firebase';
import SysGroup from './SubComponents/SysGroup';
import MainStage from './MainStage';
import revData from '../../misc/dataFormat.json';
import SavedIndicator from '../../misc/SavedIndicator';
import Alert from '../../misc/Alert';
import { generateDocument } from '../../misc/helperfunc';
import { DBTextInput } from './SubComponents/DBInput/Extensions/DBTextInput';
import DefaultMainStage from './DefaultMainStage';
import { DBNumberInput } from './SubComponents/DBInput/Extensions/DBNumberInput';
import {useModal} from '../../misc/customHooks';
import { NotesDrawer } from './NotesDrawer';


const NewMainStage = ({sysID, revID, style}) => {
    const [isUpdating, setIsUpdating] = useState(false);
    const [revision, setRevision] = useState({});

    const {isOpen, onOpen, onClose} = useModal();


    const DBROOT= `revisions/${sysID}/${revID}`;

    useEffect(() => {
        const loadGeneral = async () => {
            setRevision({});
            const revRef = ref(database, DBROOT);
            try{
                const snap = await get(revRef);
                setRevision(snap.val());
            }catch(err){
                console.log(err);
                Alert.error("Error loading revision data");
            }
        }   
        loadGeneral();

    }, [DBROOT])


    const updateDB = async (val, path) => {
        setIsUpdating(true);
        const db = ref(database, path);
        try{
            await set(db, val)
        }catch(err){
            Alert.error(`Error writing system data of ${val} to the cloud`);
        }
        setIsUpdating(false);
    }

    if(!revision){
        return <DefaultMainStage/>
    }


    return (
        <MainStage
            style={style}
            newStageComp={
                <>
                    <div className='p-1 w-100'>
                     <div style={{position:'relative'}}>
                        <Button onClick={onOpen} style={{float: 'right'}}>Notes</Button>
                        <SavedIndicator isUpdating={isUpdating} style={{position: 'absolute', left: '45%', marginTop: '10px'}}/>
                        </div>    
                    
                    <Button style={{display: 'block', marginBottom: '10px'}} onClick={()=>generateDocument()} color='green' appearance="primary">Generate File</Button>
                            
                    </div>
                    <div style={{width: '40%'}} className='mx-auto mb-3'>
                        <DBTextInput
                            onChange={(e, path) => {updateDB(e, path);  setRevision(v=> {v.name=e; return v})}} 
                            dbPath={`${DBROOT}/${revData.general.name.db}`}
                            title="Revision Name" 
                            style={{ fontSize: '32px', width: '100%'}} 
                            placeholder='Revision Name'
                        />
                        <DBNumberInput
                            onChange={(e, path) => updateDB(e, path)}
                            dbPath={`${DBROOT}/${revData.general.revision_number.db}`}
                            title="Rev. Number"
                            placeholder='0'
                            style={{width: '100px'}}
                        />
                    </div>
                    <Grid fluid>
                        <Row>
                            <Col xs={8}>
                                <SysGroup rootPath={`general/${revision.system}`} data={revData.system} onUpdated={(e, path) => updateDB(e, path)} title='System'/>
                            </Col>
                            <Col xs={8}>
                                <SysGroup rootPath={`atc/${revision.atc}`} data={revData.atc} onUpdated={(e, path) => updateDB(e, path)} title='ATC'/>
                            </Col>
                            <Col xs={8}>
                                <SysGroup rootPath={`acses/${revision.acses}`} data={revData.acses} onUpdated={(e, path) => updateDB(e, path)} title='ACSES'/>
                            </Col>
                        </Row>
                    </Grid>
                    <NotesDrawer 
                        isOpen={isOpen} 
                        onClose={onClose} 
                        id={revision.notes} 
                        name={revision.name} 
                        onChange={(e,path) => updateDB(e, path)}
                    />
                </>
            }
        />
    );
};

export default NewMainStage;
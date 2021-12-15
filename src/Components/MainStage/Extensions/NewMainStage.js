import React, {useState } from 'react';
import {Button, ButtonToolbar, ButtonGroup, Grid, Row, Col } from 'rsuite';
import { faRedo, faUndo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {set, ref} from 'firebase/database';

import database from '../../../misc/firebase';
import MainStage from '../MainStage';
import revData from '../../../misc/dataFormat.json';
import SavedIndicator from '../../../misc/SavedIndicator';
import Alert from '../../../misc/Alert';
import { generateDocument } from '../../../misc/helperfunc';
import { DBTextInput } from '../SubComponents/DBInput/Extensions/DBTextInput';
import DefaultMainStage from './DefaultMainStage';
import { DBNumberInput } from '../SubComponents/DBInput/Extensions/DBNumberInput';
import {useModal, useSubSystems} from '../../../misc/customHooks';
import { NotesDrawer } from '../misc/NotesDrawer';
import SubSystemNav from '../SubSystemNav';
import SubSystems from '../SubSystems';




const NewMainStage = ({sysID, revID, style}) => {
    const subSystems = useSubSystems(revID);
    const [isUpdating, setIsUpdating] = useState(false);
    const [revision, setRevision] = useState({});

    const {isOpen, onOpen, onClose} = useModal();


    const DBROOT= `revisions/${sysID}/${revID}`;

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
                    <div className='p-1 w-100 mb-1'>
                        <Grid fluid>
                            <Row>
                                <Col xs={8}>
                                    <Button style={{marginRight: '10px'}} onClick={()=>generateDocument()} color='green' appearance="primary">Generate File</Button>
                                    <Button appearance='subtle' onClick={onOpen}>Notes</Button>
                                    <SubSystems subSystems={subSystems} revID={revID}/>
                                </Col>
                                <Col xs={8}>
                                    <DBTextInput
                                        onChange={(e, path) => {updateDB(e, path);  setRevision(v=> {v.name=e; return v})}} 
                                        dbPath={`${DBROOT}/${revData.revision.name.db}`}
                                        title="Revision Name" 
                                        style={{ fontSize: '32px', textAlign: 'center'}} 
                                        placeholder='Revision Name'
                                        noLabel
                                    />
                                    <DBNumberInput
                                        onChange={(e, path) => updateDB(e, path)}
                                        dbPath={`${DBROOT}/${revData.revision.revision_number.db}`}
                                        title="Rev. Number"
                                        placeholder='0'
                                        style={{width: '50px'}}
                                        size='xs'
                                    />
                                </Col>
                                <Col xs={8}>
                                    <div style={{float: 'right'}}>
                                        <div>
                                            <ButtonToolbar style={{display: 'inline'}}>
                                                <ButtonGroup>
                                                    <Button size='xs' appearance='subtle'><FontAwesomeIcon icon={faUndo}/></Button>
                                                    <Button size='xs' appearance='subtle'><FontAwesomeIcon icon={faRedo}/></Button>
                                                </ButtonGroup>
                                            </ButtonToolbar>
                                            <span style={{marginRight: '5px', marginLeft: '5px', borderRight: '1px solid white'}}/>
                                            <SavedIndicator isUpdating={isUpdating}/>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </Grid>
                    </div>

                    <SubSystemNav subSystems={subSystems} revID={revID}/>
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
import React from 'react';
import {Button, Grid, Row, Col } from 'rsuite';
import {set, ref} from 'firebase/database';

import database from '../../../misc/firebase';
import MainStage from '../MainStage';
import Alert from '../../../misc/Alert';
import { generateDocument } from '../../../misc/helperfunc';
import {useModal, useSubSystems} from '../../../misc/customHooks';
import { NotesDrawer } from '../misc/NotesDrawer';
import SubSystemNav from '../SubSystem/SubSystemNav';
import SubSystems from '../SubSystem/SubSystems';
import { ToolBarProvider } from '../../../Contexts/toolbar.context';
import { TitleBar } from '../misc/TitleBar';
import ToolBar from '../misc/ToolBar';



const NewMainStage = ({sysID, revID, style}) => {
    const subSystems = useSubSystems(revID);
    // const [revision, setRevision] = useState({});

    const {isOpen, onOpen, onClose} = useModal();


    // const DBROOT= `revisions/${sysID}/${revID}`;

    const updateDB = async (val, path) => {
        const db = ref(database, path);
        try{
            await set(db, val)
        }catch(err){
            Alert.error(`Error writing system data of ${val} to the cloud`);
        }
    }

    return (
        <MainStage
            style={style}
            newStageComp={
                <>
                    <ToolBarProvider>
                        <div className='p-1 w-100 mb-1'>
                            <Grid fluid>
                                <Row>
                                    <Col xs={8}>
                                        <Button style={{marginRight: '10px'}} onClick={()=>generateDocument()} color='green' appearance="primary">Generate File</Button>
                                        <Button appearance='subtle' onClick={onOpen}>Notes</Button>
                                        <SubSystems subSystems={subSystems} revID={revID}/>
                                    </Col>
                                    <Col xs={8}>
                                        <TitleBar revID={revID} sysID={sysID}/> 
                                    </Col>
                                    <Col xs={8}>
                                        <div style={{float: 'right'}}>
                                            <ToolBar/>
                                        </div>
                                    </Col>
                                </Row>
                            </Grid>
                        </div>
                        <SubSystemNav subSystems={subSystems} revID={revID}/>
                        <NotesDrawer 
                            isOpen={isOpen} 
                            onClose={onClose} 
                            // id={revision.notes} 
                            // name={revision.name} 
                            onChange={(e,path) => updateDB(e, path)}
                        />
                    </ToolBarProvider>
                </>
            }
        />
    );
};

export default NewMainStage;
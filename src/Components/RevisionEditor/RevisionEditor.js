import React, { useState } from 'react';
import {Button, Grid, Row, Col } from 'rsuite';

import { generateDocument } from '../../misc/helperfunc';
import {useModal, useSubSystems} from '../../misc/customHooks';
import { NotesDrawer } from './misc/NotesDrawer';
import SubSystemNav from './SubSystem/SubSystemNav';
import SubSystems from './SubSystem/SubSystems';
import { ToolBarProvider } from '../../Contexts/toolbar.context';
import { TitleBar } from './misc/TitleBar';
import ToolBar from './misc/ToolBar';
import { useSelection } from '../../Contexts/selection.context';



const RevisionEditor = () => {
    const [geningFile, setGeningFile] = useState(false);
    const {selRevID, selSysID} = useSelection();
    const subSystems = useSubSystems(selRevID);

    const {isOpen, onOpen, onClose} = useModal();

    const handleGenClick = async () => {
        setGeningFile(true);
        await generateDocument(selSysID, selRevID);
        setGeningFile(false);
    }

    return (
        <div>
            <ToolBarProvider>
                <div className='p-1 w-100 mb-1'>
                    <Grid fluid>
                        <Row>
                            <Col xs={8}>
                                <Button style={{marginRight: '10px'}} disabled={geningFile} onClick={()=>handleGenClick()} color='green' appearance="primary">Generate File</Button>
                                <Button appearance='subtle' onClick={onOpen}>Notes</Button>
                                <SubSystems subSystems={subSystems}/>
                            </Col>
                            <Col xs={8}>
                                <TitleBar/> 
                            </Col>
                            <Col xs={8}>
                                <div style={{float: 'right'}}>
                                    <ToolBar/>
                                </div>
                            </Col>
                        </Row>
                    </Grid>
                </div>
                <SubSystemNav subSystems={subSystems}/>
                <NotesDrawer 
                    isOpen={isOpen} 
                    onClose={onClose} 
                />
            </ToolBarProvider>
        </div>
    );
};

export default RevisionEditor;
import React, {useState, useEffect } from 'react';
import {Button, ButtonToolbar, ButtonGroup } from 'rsuite';
import { faRedo, faUndo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {set, ref, off, onValue} from 'firebase/database';

import database from '../../../misc/firebase';
import MainStage from '../MainStage';
import revData from '../../../misc/dataFormat.json';
import SavedIndicator from '../../../misc/SavedIndicator';
import Alert from '../../../misc/Alert';
import { generateDocument } from '../../../misc/helperfunc';
import { DBTextInput } from '../SubComponents/DBInput/Extensions/DBTextInput';
import DefaultMainStage from './DefaultMainStage';
import { DBNumberInput } from '../SubComponents/DBInput/Extensions/DBNumberInput';
import {useModal} from '../../../misc/customHooks';
import { NotesDrawer } from '../misc/NotesDrawer';
import SubSystemNav from '../SubSystemNav';
import AddACSESATC from '../AddACSESATC';




const NewMainStage = ({sysID, revID, style}) => {
    const [isUpdating, setIsUpdating] = useState(false);
    const [revision, setRevision] = useState({});

    const {isOpen, onOpen, onClose} = useModal();


    const DBROOT= `revisions/${sysID}/${revID}`;

    useEffect(() => {
        const revRef = ref(database, DBROOT);
        const linkToRevision = () => {
            setRevision({});
            onValue((revRef, snap) => {
                setRevision(snap.val());
            }, (err) => {
                console.log(err);
                Alert.error("Error loading revision data");
            })
        }
        linkToRevision();

        return () => {
            off(revRef);
        }
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
                        <div style={{display: 'inline-block', width: '30%', float: 'left'}}>
                            <Button style={{display: 'block', marginBottom: '10px'}} onClick={()=>generateDocument()} color='green' appearance="primary">Generate File</Button>
                            <AddACSESATC subSystems={revision.subSystems} sysID={sysID} revID={revID}/>
                        </div>
                        <div style={{display: 'inline-block', width: '40%'}}>   
                            <div style={{width: '100%'}} className='mx-auto'>
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
                            </div>
                        </div>
                        <div style={{display: 'contents', width: '30%'}}>
                            <div style={{float: 'right'}}>
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
                    </div>
                    <div className='p-1 w-100'>
                        
                     <div style={{position: 'relative'}}>
                        <div style={{position: 'absolute', right: '0px'}}>
                            <Button onClick={onOpen}>Notes</Button>
                        </div>
                    </div>    
                    

                   
                    </div>
                    <SubSystemNav subSystems={revision.subSystems}/>
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
import React, { useState } from 'react'
import {Col, Row, Grid } from 'rsuite';
import moment from 'moment';

import HoverShowAll from '../../../../misc/Helper Components/HoverShowAll';
import { RevisionDB } from '../../../../../Database/SystemDB/RevisionDB/RevisionDB';
import Alert from '../../../../../misc/Alert';
import DeleteModal from '../../../../misc/DeleteModal';
import { OptionsPopUp } from '../../../../misc/Helper Components/OptionsPopUp';
import MoveModal from './MoveModal';
import { useSelection } from '../../../../../Contexts/selection.context';


export const Revision = ({onSelected, name, timestamp, revNumber=0, isSelected, id, sysID}) => {
    const {setSelection, selectNone} = useSelection();
    const [showDelModal, setshowDelModal] = useState(false);
    const [showMoveModal, setShowMoveModal] = useState(false);

    name=name || 'Untitled'; 

    const t = moment(timestamp);
    const isNew = moment().subtract(2, "days").isBefore(t);

    const selStyle = isSelected ? {borderLeft: '2px solid white'} : null;


    const handleMove = async (newSysID, sysName) => {
        try{
            setShowMoveModal(false);
            selectNone();
            Alert.info(`Moving ${name} to ${sysName}...`);


            const newID = await RevisionDB.move(sysID, id, newSysID);
            setSelection(newID, newSysID);
            Alert.success(`Moved revision ${name} to ${sysName}`);
        }catch(err){
            Alert.error(`Unable to move revision ${name} to ${sysName}`)
        }
    }

    const handleDuplicate = async () => {
        try{   
            const dupID = await RevisionDB.duplicate(sysID, id);
            setSelection(dupID, sysID);
            Alert.success(`Successfully duplicated revision ${name}`)
        }catch(e){
            Alert.error(`Unable to duplicate revision ${name}`)
        }
    }


    const handleClick = () => {
        if(!showDelModal && !showMoveModal){onSelected()}
    }
    return (
        <div type='button' tabIndex={0} role="button" styling="link" onClick={handleClick} onKeyDown={handleClick} style={{display: 'block', width: '100%', ...selStyle}} className='rs-list-item pointer p-1'>
            <Grid fluid>
                <Row>
                    <Col xs={5}>
                        <HoverShowAll text={name}>
                            <p className='bold ellip-overflow align-l'>{name}</p>
                        </HoverShowAll>
                    </Col>
                    <Col xs={5}>
                        {isNew ? <span className='new'>New</span> : null}
                        
                    </Col>
                    <Col xs={5}>
                        <span className='muted-c'>Rev </span>{revNumber}
                    </Col>
                    <Col xs={7}>
                        <span style={{fontSize: '12px'}}>
                            <p className='muted-c ellip-overflow'>{t.format("MMM Do YY")}</p>
                            <p className='muted-c mt-0 ellip-overflow'>{t.format("h:mm:ss a")}</p>
                        </span>
                    </Col>
                    <Col xs={2}>
                        <OptionsPopUp
                            nameEvtObj={[
                                {
                                    name: 'Move',
                                    eventHandler: () => setShowMoveModal(true)
                                },
                                {
                                    name: 'Duplicate',
                                    eventHandler: ()=>handleDuplicate()
                                },
                                {
                                    name: 'Delete',
                                    eventHandler: ()=>setshowDelModal(true)
                                }
                            ]}
                        />
                    </Col>
                </Row>
            </Grid> 
            <MoveModal
                show={showMoveModal}
                handleClose={()=>setShowMoveModal(false)}
                handleMove={handleMove}
                revName={name}
                curSysID={sysID}
            />
            <DeleteModal
                show={showDelModal}
                handleClose={()=>setshowDelModal(false)}
                title={`Delete ${name}?`}
                body={`Are you sure you want to delete ${name} revision`}
                handleDelete={async () => {
                    try{
                        await RevisionDB.deleteSpecific(sysID, id);
                        selectNone();
                        Alert.success('Successfully deleted the revision');
                    }catch(e){
                        Alert.error('Unable to delete the revision');
                    }
                }}
            />
        </div>
    )
}

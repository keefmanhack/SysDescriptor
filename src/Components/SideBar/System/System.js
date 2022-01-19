import React, { useState } from 'react';
import {Row, Col, Grid, Button} from 'rsuite';
import ArrowRightIcon from '@rsuite/icons/ArrowRight';
import ArrowDownIcon from '@rsuite/icons/ArrowDown';
import { SystemOptions } from './SystemOptions';
import HoverShowAll from '../../misc/Helper Components/HoverShowAll';
import RevList from './Rev List/RevList';
import DeleteModal from '../../misc/DeleteModal';
import { SystemDB } from '../../../Database/SystemDB/SystemDB';
import Alert from '../../../misc/Alert';
import EditSystemModal from '../SystemModal/EditSystemModal';

export const System = ({sysID, title='Untitled', partNumber, sysNumber, technician, owner, onRevSelected, onNewRevision, isSelected, revSelectedID}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    title = title ==='' ? 'Untitled' : title;

    const selStyle= isSelected ? {borderLeft: '1px solid lightgreen'} : null

    const handleClick = () => {setIsExpanded(v => !v)}

    const handleNewRev = () => {
        onNewRevision();
        if(!isExpanded){setIsExpanded(true)}
    }

    const handleDelete = async () => {
        try{
            await SystemDB.delete(sysID);
            Alert.success('Successfully deleted the system');
        }catch(e){
            Alert.error('Unable to delete system');
        }
    }

    return (
        <div className='rs-list rs-list-hover'>
            <div type='button' tabIndex={0} role="button" styling="link" onClick={handleClick} onKeyDown={handleClick} className='rs-list-item pointer p-2' style={{...selStyle, width: '100%'}}>
                <Grid fluid>
                    <Row>
                        <Col xs={2}>
                            <Button style={{fontSize: '18px'}} appearance='subtle' size='xs'>
                                {isExpanded ? <ArrowDownIcon/> : <ArrowRightIcon/>}
                            </Button>
                        </Col>
                        <Col xs={8}>
                            <HoverShowAll text={title}>
                                <h5 className='ellip-overflow align-l'>{title}</h5>
                            </HoverShowAll>
                            <HoverShowAll text={partNumber}>
                                <p className='muted-c ellip-overflow'>{partNumber}</p>
                            </HoverShowAll>
                        </Col>
                        <Col xs={2}>
                            <HoverShowAll text="System Number">
                                <p className='muted-c ellip-overflow'>{sysNumber}</p>
                            </HoverShowAll>
                        </Col>
                        <Col xs={5}>
                            <HoverShowAll text={`Technician: ${technician}`}>
                                <p className='muted-c ellip-overflow'>{technician}</p>
                            </HoverShowAll>
                        </Col>
                        <Col xs={5}>
                            <HoverShowAll text={`Owner: ${owner}`}>
                                <p className='muted-c ellip-overflow'>{owner}</p>
                            </HoverShowAll>
                        </Col>
                        <Col xs={2}>
                            <SystemOptions
                                onNewRevision={()=>handleNewRev()}
                                onEditSystem={()=>setShowEditModal(true)}
                                onDeleteSystem={()=>setShowDeleteModal(true)}
                            />
                        </Col>
                    </Row>
                </Grid>         
            </div>
            <EditSystemModal
                show={showEditModal}
                handleClose={()=>setShowEditModal(false)}
                title={title}
                defSysNumber={sysNumber}
                defTechnician={technician}
                defOwner={owner}
                sysID={sysID}
            />
            <DeleteModal
                show={showDeleteModal}
                handleClose={()=>setShowDeleteModal(false)}
                handleDelete={handleDelete}
                title={`Delete system ${title}?`}
                body={
                    <>
                        <p>Are you sure you want to delete <strong>{title}</strong>?</p>
                        <Grid fluid>
                            <Row>
                                <Col>
                                    <p className='bold'>Technician</p>
                                    <p>{technician}</p>
                                </Col>
                                <Col>
                                    <p className='bold'>Owner</p>
                                    <p>{owner}</p>
                                </Col>
                            </Row>
                        </Grid>
                    </>
                }
            />
            {isExpanded ? <RevList revSelectedID={revSelectedID} onRevSelected={(id)=>onRevSelected(id)} sysID={sysID}/> : null}           
        </div>
    )
}
import React, { useState } from 'react'
import { Button, Col, Row, Grid } from 'rsuite';
import TrashIcon from '@rsuite/icons/Trash';
import moment from 'moment';

import { useHover } from '../../../../../misc/customHooks';
import HoverShowAll from '../../../../misc/Helper Components/HoverShowAll';
import { RevisionDB } from '../../../../../Database/SystemDB/RevisionDB/RevisionDB';
import Alert from '../../../../../misc/Alert';
import DeleteModal from '../../../../misc/DeleteModal';


export const Revision = ({onSelected, name, timestamp, revNumber=0, isSelected, id, sysID}) => {
    const [showModal, setShowModal] = useState(false);

    const [ref, hover] = useHover();
    name=name || 'Untitled';

    const t = moment(timestamp);
    const isNew = moment().subtract(2, "days").isBefore(t);

    const selStyle = isSelected ? {borderLeft: '2px solid white'} : null;

    const handleClick = () => {onSelected()}
    return (
        <div type='button' tabIndex={0} role="button" styling="link" onClick={handleClick} onKeyDown={handleClick} style={{display: 'block', width: '100%', ...selStyle}}  ref={ref} className='rs-list-item pointer p-1'>
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
                        <Button onClick={(e)=>{e.stopPropagation(); setShowModal(true)}} size='xs' appearance='subtle' color='red' style={{position: 'absolute', left: '1px', top: '4px', display: hover ? 'inline-block' : 'none' }}>
                            <TrashIcon/>
                        </Button>
                    </Col>
                </Row>
            </Grid> 
            <DeleteModal
                show={showModal}
                handleClose={()=>setShowModal(false)}
                title={`Delete ${name}?`}
                body={`Are you sure you want to delete ${name} revision`}
                handleDelete={async () => {
                    try{
                        await RevisionDB.deleteSpecific(sysID, id);
                        Alert.success('Successfully deleted the revision');
                    }catch(e){
                        Alert.error('Unable to delete the revision');
                    }
                }}
            />
        </div>
    )
}

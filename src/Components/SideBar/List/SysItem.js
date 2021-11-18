import React, { useState } from 'react';
import { Grid, Row, Col, Button, List } from 'rsuite';
import TrashIcon from '@rsuite/icons/Trash';
import DeleteModal from '../../../misc/DeleteModal';
import { useHover } from '../../../misc/customHooks';
import HoverShowAll from './HoverShowAll';

const styles = {
    cursor: 'pointer',
}


const SysItem = ({name="Untitled", tech="...", owner="...", timestamp, isNew, onDeleted, style}) => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const handleClose = () => setShowDeleteModal(false);
    const [ref, hover] = useHover();

    return (
        <>
            <List.Item ref={ref} className='height-75' style={{...styles, ...style}}>
                <Grid fluid>
                    <Row>
                        <Col xs={10} md={8}>
                            <HoverShowAll text={name}>
                                <h5 className='ellip-overflow'>{name==='' ? 'Untitled' : name}</h5>
                            </HoverShowAll>
                            {isNew ? <span style={{color: 'yellow'}}>New</span> : null}
                        </Col>
                        <Col xs={4} md={4}>
                            <p className='muted-c ellip-overflow'>Technician</p>
                            <HoverShowAll text={tech}>
                                <p className='mt-1 ellip-overflow'>{tech === '' ? '...' : tech}</p>
                            </HoverShowAll>
                        </Col>
                        <Col xs={4} md={4}>
                            <p className='muted-c ellip-overflow'>Owner</p>
                            <HoverShowAll text={owner}>
                                <p className='mt-1 ellip-overflow'>{owner === '' ? '...' : owner}</p>
                            </HoverShowAll>
                            
                        </Col>
                        <Col xs={4} md={6} className='mt-1 muted-c'>
                            <p className='f-s ellip-overflow text-center'>{timestamp ? new Date(timestamp).toLocaleDateString() : "..."}</p>
                            <p className='f-s m-0 ellip-overflow text-center'>{timestamp ? new Date(timestamp).toLocaleTimeString() : "..."}</p>
                        </Col>
                        <Col xs={2} md={2}>
                            <Button 
                                onClick={(e)=>{e.stopPropagation(); setShowDeleteModal(true)}} 
                                className='mt-1' 
                                style={{float: 'right', color: 'white', fontSize: 16, padding: '5px', appearance: '.2s', display: hover ? 'inline-block' : 'none'}}
                                appearance="subtle" 
                                size='sm' 
                                color="red"
                            >
                                <TrashIcon/>
                            </Button>
                        </Col>
                    </Row>
                </Grid>
                <List>
                    <List.Item>
                        Rev 1
                    </List.Item>
                    <List.Item>
                        Rev 2
                    </List.Item>
                </List>
            </List.Item>
            <DeleteModal onDelete={()=>{handleClose(); onDeleted()}} handleClose={handleClose} show={showDeleteModal} title={name} tech={tech} owner={owner} timestamp={timestamp}/>
        </>
    );
};

export default SysItem;
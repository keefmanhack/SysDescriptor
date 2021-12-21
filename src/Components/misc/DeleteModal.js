import React from 'react';
import { Button, Grid, Row, Col, Modal } from 'rsuite';

const DeleteModal = ({title, tech, owner, timestamp, show, handleClose, onDelete}) => {
    console.log();
    return (
        <Modal size='xs' open={show} onClose={handleClose}>
            <Modal.Header>
                <Modal.Title>Delete <strong>{title}</strong>?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Are you sure you want to delete <strong>{title}</strong>?</p>
                <Grid fluid>
                    <Row>
                        <Col>
                            <p className='bold'>Technician</p>
                            <p>{tech}</p>
                        </Col>
                        <Col>
                            <p className='bold'>Owner</p>
                            <p>{owner}</p>
                        </Col>
                        <Col>
                            <p className='bold'>Created...</p>
                            <p className='f-s ellip-overflow text-center'>{timestamp ? new Date(timestamp).toLocaleDateString() : "..."}</p>
                            <p className='f-s m-0 ellip-overflow text-center'>{timestamp ? new Date(timestamp).toLocaleTimeString() : "..."}</p>
                        </Col>
                    </Row>
                </Grid>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onDelete} color='red' appearance='primary'>
                    Delete
                </Button>
                <Button onClick={handleClose} appearance='subtle'>
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteModal;
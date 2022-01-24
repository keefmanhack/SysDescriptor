import React from 'react';
import { Button, Modal } from 'rsuite';

const DeleteModal = ({show, handleClose, handleDelete, title, body}) => {
    const myHandleClose = e => {
        handleClose();
        e.stopPropagation();
    }


    return (
        <Modal size='xs' open={show} onClose={myHandleClose}>
            <Modal.Header>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {body}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={(e)=>{handleDelete(); e.stopPropagation()}} color='red' appearance='primary'>
                    Delete
                </Button>
                <Button onClick={myHandleClose} appearance='subtle'>
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteModal;
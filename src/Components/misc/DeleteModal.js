import React from 'react';
import { Button, Modal } from 'rsuite';

const DeleteModal = ({show, handleClose, handleDelete, title, body}) => {
    return (
        <Modal size='xs' open={show} onClose={handleClose}>
            <Modal.Header>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {body}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleDelete} color='red' appearance='primary'>
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
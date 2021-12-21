import React from 'react';
import { Button, Modal } from 'rsuite';

const CompDeleteModal = ({show, onClose, onDelete, name}) => {
    return (
        <Modal open={show} onClose={onClose}>
            <Modal.Header>
                <Modal.Title>
                    Are you sure ?
                </Modal.Title>
                <Modal.Body>
                    <p>
                        Are you sure you want to delete the <strong>{name}</strong> component?
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button color='red' appearance='primary' onClick={onDelete}>Yes</Button>
                    <Button appearance='subtle' onClick={onClose}>No</Button>
                </Modal.Footer>
            </Modal.Header>
        </Modal>
    );
};

export default CompDeleteModal;
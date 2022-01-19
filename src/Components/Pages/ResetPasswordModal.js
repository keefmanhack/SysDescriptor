import { sendPasswordResetEmail } from 'firebase/auth';
import React, { useState } from 'react'
import {Form, Modal, Button, Schema} from 'rsuite';
import Alert from '../../misc/Alert';
import { auth } from '../../misc/firebase';

const model = Schema.Model({
    email: Schema.Types.StringType().pattern(/.*@siemens.com/,'A valid Siemens email is required')
})

const ResetPasswordModal = ({show, onClose}) => {
    const [email, setEmail] = useState('');

    const handlePassResetSubmit = () => {
        if(model.check({email})){
            sendPasswordResetEmail(auth, email)
            .then(() => {
                Alert.success(`Password reset email sent to ${email}`, Alert.PlacementType.TOPCENTER, 4000);
            })
            .catch(e => {
                Alert.error(e.message, Alert.PlacementType.TOPCENTER, 4000);
            })
            onClose();
        }
    }

    return (
        <Modal onClose={onClose} open={show} size='xs'>
            <Modal.Header>
                <Modal.Title>Reset Password</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form model={model} onSubmit={handlePassResetSubmit}>
                    <Form.Group controlId="email">
                        <Form.ControlLabel>Siemens Email</Form.ControlLabel>
                        <Form.Control value={email} onChange={(v)=>setEmail(v)} name='email'/>
                    </Form.Group>
                    <Form.Group>
                        <Button appearance='primary' block type='submit'>Send Reset Email</Button>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onClose} appearance='subtle'>Cancel</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ResetPasswordModal;

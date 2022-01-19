import { signInWithEmailAndPassword } from 'firebase/auth';
import React, {useState} from 'react'
import { Button, Form, Modal } from 'rsuite';
import Alert from '../../misc/Alert';
import { auth } from '../../misc/firebase';

const SignInModal = ({show, onClose, handlePassReset}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = () => {
        signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            Alert.success('You have been successfully signed in');
        })
        .catch((err)=> {
            Alert.error(err.message);
        })
    }


    return (
        <Modal size='xs' backdrop open={show} onClose={onClose}>
            <Modal.Header>
            <Modal.Title>Sign In</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.ControlLabel>Siemens Email</Form.ControlLabel>
                        <Form.Control name='email' onKeyUp={(v)=>setEmail(v.target.value)}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.ControlLabel>Password</Form.ControlLabel>
                        <Form.Control name='password' onKeyUp={(v)=>setPassword(v.target.value)} type='password'/>
                    </Form.Group>
                    <Form.Group>
                        <Button appearance='primary' block type='submit'>Sign in</Button>
                    </Form.Group>
                </Form>
                <Button style={{float: 'right'}} onClick={handlePassReset} appearance='link'>Reset Password</Button>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onClose} appearance='subtle'>Cancel</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default SignInModal;

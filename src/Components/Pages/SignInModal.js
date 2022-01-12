import { signInWithEmailAndPassword } from 'firebase/auth';
import React, {useState} from 'react'
import { Button, Form, Modal } from 'rsuite';
import Alert from '../../misc/Alert';
import { auth } from '../../misc/firebase';

const SignInModal = ({show, onClose}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const handleSubmit = () => {
        signInWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
            console.log(userCredential);
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
                    <Form.Control onKeyUp={(v)=>setEmail(v.target.value)}/>
                </Form.Group>
                <Form.Group>
                    <Form.ControlLabel>Password</Form.ControlLabel>
                    <Form.Control onKeyUp={(v)=>setPassword(v.target.value)} type='password'/>
                </Form.Group>
                <Form.Group>
                    <Button appearance='primary' block type='submit'>Sign in</Button>
                </Form.Group>
            </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onClose} appearance='subtle'>Cancel</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default SignInModal;

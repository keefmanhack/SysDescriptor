import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, {useState} from 'react'
import {Form, Button, Schema} from 'rsuite';
import { ProfileDB } from '../../Database/ProfileDB';

import Alert from '../../misc/Alert';
// import { useWindowHeight } from '../../misc/customHooks';
import { auth } from '../../misc/firebase';


export default function JoinForm() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRetry, setPasswordRetry] = useState('');

    const model = Schema.Model({
        firstName: Schema.Types.StringType().isRequired('This field is required'),
        lastName: Schema.Types.StringType().isRequired('This field is required'),
        email: Schema.Types.StringType().pattern(/.*@siemens.com/,'A valid Siemens email is required'),
        password: Schema.Types.StringType().isRequired('This field is required'),
        passwordRetry: Schema.Types.StringType().addRule(() => {
            if (password !== passwordRetry) {
              return false;
            }
            return true;
          }, 'The passwords do not match')
      })
  
  
      const resetFormState= () => {
          setFirstName(''); setLastName(''); setEmail(''); setPassword(''); setPasswordRetry('');
      }
  
  
      const handleNewUser = async () => {
          if(model.check({firstName, lastName, email, password, passwordRetry})){
              createUserWithEmailAndPassword(auth, email, password)
              .then(()=> {
                Alert.success(`Welcome to SysDescriptor ${firstName}`, Alert.PlacementType.TOPCENTER, 4000);
                ProfileDB.create(firstName, lastName, email);
              })
              .catch((e)=> {
                Alert.error(e.message, Alert.PlacementType.TOPCENTER,4000);
              })
            resetFormState();              
          }
      }

    return (
        <div style={{ borderRadius: '5px', padding: '10px', width: '350px', height: '100%'}} id='join-form'>
            <h2>Join</h2>
            <p>You must be a Siemens employee to make use of this site</p>
            <hr/>
            <Form onSubmit={handleNewUser} model={model}>
                <div style={{height: '95%', overflowY: 'scroll'}}>
                    <Form.Group controlId='firstName'>
                        <Form.ControlLabel>First Name</Form.ControlLabel>
                        <Form.Control value={firstName} onChange={(v)=>setFirstName(v)} name='firstName'/>
                    </Form.Group>
                    <Form.Group controlId='lastName'>
                        <Form.ControlLabel>Last Name</Form.ControlLabel>
                        <Form.Control value={lastName} onChange={v=>setLastName(v)} name='lastName'/>
                    </Form.Group>
                    <Form.Group controlId="email">
                        <Form.ControlLabel>Siemens Email</Form.ControlLabel>
                        <Form.Control value={email} onChange={v=>setEmail(v)} name="email" type="email" />
                    <Form.HelpText tooltip>Valid Siemens email address is required</Form.HelpText>
                    </Form.Group>
                    <Form.Group controlId="password">
                        <Form.ControlLabel>Password</Form.ControlLabel>
                        <Form.Control value={password} onChange={v=>setPassword(v)} name="password" type="password" autoComplete="off" />
                    </Form.Group>
                    <Form.Group controlId="passwordRetry">
                        <Form.ControlLabel>Password Retry</Form.ControlLabel>
                        <Form.Control value={passwordRetry} onChange={v=>setPasswordRetry(v)} name="passwordRetry" type="password" autoComplete="off" />
                    </Form.Group>
                </div>

                <Form.Group>
                    <Button style={{marginTop: '15px'}} type='submit' block size='lg' appearance="primary">Join</Button>
                </Form.Group>
            </Form>
      </div>
    )
}

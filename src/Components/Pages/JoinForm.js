import { sendSignInLinkToEmail } from 'firebase/auth';
import React, {useState} from 'react'
import {Form, Button, Schema} from 'rsuite';

import Alert from '../../misc/Alert';
import { useWindowHeight } from '../../misc/customHooks';
import { auth } from '../../misc/firebase';

const actionCodeSettings = {
    // URL you want to redirect back to. The domain (www.example.com) for this
    // URL must be in the authorized domains list in the Firebase Console.
    url: `https://sysdescriptor.web.app/finishSignUp'`,
    // This must be true.
    handleCodeInApp: true 
};


export default function JoinForm() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRetry, setPasswordRetry] = useState('');

    console.log(firstName, lastName);

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
          if(model.check()){
            sendSignInLinkToEmail(auth, email, actionCodeSettings)
            .then(() => {
                Alert.success(`An email has been sent to ${email}.  Click the link inside to activate your account`, Alert.PlacementType.TOPCENTER, 4000);
            })
            .catch((e) => {
                console.log(e)
                Alert.error("Unable to generate user account", Alert.PlacementType.TOPCENTER,4000);
            })
            resetFormState();              
          }
      }

    return (
        <div style={{ borderRadius: '5px', padding: '10px', width: '350px'}} id='join-form'>
            <h2>Join</h2>
            <p>You must be a Siemens employee to make use of this site</p>
            <hr/>
            <Form onSubmit={handleNewUser} model={model}>
                <div style={{height: `${useWindowHeight() -600}px`, overflowY: 'scroll'}}>
                    <Form.Group controlId='firstName'>
                    <Form.ControlLabel>First Name</Form.ControlLabel>
                    <Form.Control onKeyUp={(v)=>setFirstName(v.target.value)} name='firstName'/>
                    </Form.Group>
                    <Form.Group controlId='lastName'>
                    <Form.ControlLabel>Last Name</Form.ControlLabel>
                    <Form.Control onKeyUp={v=>setLastName(v.target.value)} name='lastName'/>
                    </Form.Group>
                    <Form.Group controlId="email">
                    <Form.ControlLabel>Siemens Email</Form.ControlLabel>
                    <Form.Control onKeyUp={v=>setEmail(v.target.value)} name="email" type="email" />
                    <Form.HelpText tooltip>Valid Siemens email address is required</Form.HelpText>
                    </Form.Group>
                    <Form.Group controlId="password">
                    <Form.ControlLabel>Password</Form.ControlLabel>
                    <Form.Control onKeyUp={v=>setPassword(v.target.value)} name="password" type="password" autoComplete="off" />
                    </Form.Group>
                    <Form.Group controlId="passwordRetry">
                    <Form.ControlLabel>Password Retry</Form.ControlLabel>
                    <Form.Control onKeyUp={v=>setPasswordRetry(v.target.value)} name="passwordRetry" type="password" autoComplete="off" />
                    </Form.Group>
                </div>

                <Form.Group>
                    <Button type='submit' block size='lg' appearance="primary">Join</Button>
                </Form.Group>
            </Form>
      </div>
    )
}

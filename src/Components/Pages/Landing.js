import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, {useState} from 'react';
import {Grid, Row, Col, Button, Form, Header, Container, Schema} from 'rsuite';
import { ProfileDB } from '../../Database/ProfileDB';

import landingtrain from '../../images/landing-train.jpg';
import Alert from '../../misc/Alert';
import { useWindowHeight } from '../../misc/customHooks';
import { auth } from '../../misc/firebase';
import MyFooter from '../misc/Footer';
import SignInModal from './SignInModal';

export default function Landing() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRetry, setPasswordRetry] = useState('');
    const [showModal, setShowModal] = useState();

  
  
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


    const handleNewUser = () => {
        if(model.check()){
            createUserWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
                //  create new profile in DB and link with uid
                ProfileDB.create(userCredential.user.uid, firstName, lastName, email);
            })
            .catch(err => {
                Alert.error(err.message);
            })
            resetFormState();
        }
    }




    return (
        <Container>
            

        <div id='background-train' style={{backgroundImage: `url(${landingtrain})`  }}> 
        <SignInModal show={showModal} onClose={() => setShowModal(false)}/>
          <Header className='light-shade-c white-c p-1'>
            <Grid fluid>
              <Row>
                <Col xs={20}>
                  <h1>SysDescriptor</h1>
                </Col>
                <Col xs={4}>
                  <div>
                  <Button onClick={()=>setShowModal(true)} style={{marginTop: '5%', marginRight: '10%', float: 'right', color: 'white', fontSize: '16px'}} className='white-c' appearance='link'>Sign In</Button>
                  </div>
                </Col>
              </Row>
            </Grid>
          </Header>
  
          <h2 id='tag-line'>Siemens Rail Infastructure test unit management tool</h2>
  
          <div style={{position: 'relative', marginTop: '1%'}}>
            <div style={{position: 'absolute', right: '6%', zIndex: 3}}>
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
            </div>
          </div>
        </div>
        <MyFooter />
      </Container>
    )
}

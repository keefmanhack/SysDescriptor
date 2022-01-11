import React, { useState } from 'react';
import { Grid, Row, Col, Button, Form, Header, Container, Schema} from "rsuite";

import HeaderBar from './Components/misc/HeaderBar';
import SideBar from './Components/SideBar/SideBar';
import DefaultMainStage from './Components/MainStage/Extensions/DefaultMainStage';
import NewMainStage from './Components/MainStage/Extensions/NewMainStage';
import Footer from './Components/misc/Footer';


import './styles/main.scss';
import './styles/utility.scss';
import 'rsuite/dist/rsuite.min.css';
import { ThemeProvider } from './Contexts/theme.context';
import { RevisionDB } from './Database/SystemDB/RevisionDB/RevisionDB';

import landingtrain from './images/landing-train.jpg';
import { useWindowHeight } from './misc/customHooks';


function App() {
  const [theme, setTheme] = useState('dark')
  const [revID, setRevID] = useState(null);
  const [sysID, setSysID] = useState(null);

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


  // const hideMainStage = () => {setRevID(null); setSysID(null);}

  const onNewRevision = async (sysID) => {
    const revID = await RevisionDB.create(sysID);
    setSysID(sysID);
    setRevID(revID);
  }
  
  const onDeleteSys = () => {}


  console.log(firstName);
  console.log(lastName);
  console.log(email);



  return (
    <Container>
      <div id='background-train' style={{backgroundImage: `url(${landingtrain})`  }}> 
        <Header className='light-shade-c white-c p-1'>
          <Grid fluid>
            <Row>
              <Col xs={20}>
                <h1>SysDescriptor</h1>
              </Col>
              <Col xs={4}>
                <div>
                <Button style={{marginTop: '5%', marginRight: '10%', float: 'right', color: 'white', fontSize: '16px'}} className='white-c' appearance='link'>Sign In</Button>
                </div>
              </Col>
            </Row>
          </Grid>
        </Header>

        <h2 id='tag-line'>Siemens Rail Infastructure test unit management tool</h2>

        <div style={{position: 'relative', marginTop: '1%', height: `${useWindowHeight() -200}px`, overflowY: 'scroll'}}>
          <div style={{position: 'absolute', right: '6%', zIndex: 3}}>
            <div style={{background: 'white', borderRadius: '5px', padding: '10px', width: '350px'}}>
              <h2>Join</h2>
              <p>You must be a Siemens employee to make use of this site</p>
              <hr/>
              <Form model={model}>
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
                <Form.Group>
                  <Button type='submit' block size='lg' appearance="primary">Join</Button>
                </Form.Group>
              </Form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </Container>
  )

  /* eslint-disable no-unreachable */  
  return (
    <ThemeProvider theme={theme}>
      <div>
       <HeaderBar setTheme={(t) => setTheme(t)}/>
        <Grid fluid  style={{padding:0}}>
          <Row >
            <Col xs={24} lg={7} >
              <SideBar 
                onSysDeleted={(id) => onDeleteSys(id)} 
                revSelectedID={revID}
                sysSelectedID={sysID}
                onNewRevision={(sysID)=>onNewRevision(sysID)}
                onRevSelected={(sysID, revID)=> {setSysID(sysID); setRevID(revID); }}
              />
            </Col>
            <Col xs={24} lg={17} >
              {revID && sysID ? <NewMainStage revID={revID} sysID={sysID}/> : <DefaultMainStage/>}
            </Col>
          </Row>
        </Grid>
        <Footer style={{width: '100%'}}/>
        </div>
        </ThemeProvider>
  );
}

export default App;

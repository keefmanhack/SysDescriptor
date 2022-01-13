
import React, {useState} from 'react';
import {Grid, Row, Col, Button, Header, Container} from 'rsuite';

import landingtrain from '../../images/landing-train.jpg';
import MyFooter from '../misc/Footer';
import JoinForm from './JoinForm';
import SignInModal from './SignInModal'; 

export default function Landing() {
    const [showModal, setShowModal] = useState();

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
                <JoinForm/>
              </div>
            </div>
          </div>
          <MyFooter />
      </Container>
    )
}

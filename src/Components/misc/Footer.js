import React from 'react';
import { Col, Footer, Grid, Row } from 'rsuite';

const MyFooter = ({style}) => (
    <Footer style={{...style, clear: 'both',
        position: 'absolute',
        bottom: '0px',
        width: '100%',
        padding: '15px',
        zIndex: 0
      }}

        className='light-shade-c'
      >
        <Grid fluid>
          <Row>
            <Col xs={18}>
              <h5>
                SysDescriptor
              </h5>
            </Col>
          </Row>
          <Row>
            <Col xs={4} lg={2}>
              <a href='/'>Privacy Policy</a>
            </Col>
            <Col xs={4} lg={2}>
              <a href='/'>Terms of Use</a>
            </Col>
            <Col xs={4} lg={2}>
              <a href='/'>Accessibility</a>
            </Col>
            <Col xs={12} lg={18}>
            <div>
            <p style={{textAlign: 'right'}}>
               Developed by Siemen Engineer <a href='https://www.linkedin.com/in/keefergregoire/'>Keefer Gregoire</a>
             </p>
            </div>
            </Col>
          </Row>
        </Grid>
    </Footer>
);


export default MyFooter;
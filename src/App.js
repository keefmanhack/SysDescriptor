import React from 'react';
import { Grid, Row, Col, CustomProvider } from "rsuite";
import TitleBar from './Components/TitleBar';
import SideBar from './Components/SideBar/SideBar';
import MainStage from './Components/MainStage';

import './styles/main.scss';
import './styles/utility.scss';
import 'rsuite/dist/rsuite.min.css';


function App() {
  

  return (
    <CustomProvider theme='dark'>
       <TitleBar/>
        <Grid fluid className='h-100' style={{padding:0}}>
          <Row className='h-100'>
            <Col xs={24} md={5} className='h-100'>
              <SideBar />
            </Col>
            <Col xs={24} md={19} className='h-100'>
              <MainStage />
            </Col>
          </Row>
        </Grid>
      </CustomProvider>
  );
}

export default App;

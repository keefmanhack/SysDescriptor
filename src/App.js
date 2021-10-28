import React, { useState } from 'react';
import { Grid, Row, Col, CustomProvider} from "rsuite";
import {ref, push } from "firebase/database";
import firebase from 'firebase/compat/';
import database from './misc/firebase';

import TitleBar from './Components/TitleBar';
import SideBar from './Components/SideBar/SideBar';
import { SystemsProvider } from './Contexts/systems.context';
import DefaultMainStage from './Components/MainStage/DefaultMainStage';
import NewMainStage from './Components/MainStage/NewMainStage';


import './styles/main.scss';
import './styles/utility.scss';
import 'rsuite/dist/rsuite.min.css';



function App() {
  const [sysID, setSysID] = useState(null);
  const createNew = async () => {
    const genRef = ref(database, `systems/`);
    const newSysData = {
        timestamp: firebase.database.ServerValue.TIMESTAMP,
    }
    try{
      const id = await push(genRef, newSysData).key;
      setSysID(id);
    }catch(err){
      console.log(err); 
    }
  }

  return (
    <CustomProvider theme='dark'>
       <TitleBar/>
        <Grid fluid className='h-100' style={{padding:0}}>
          <Row className='h-100'>
            <Col xs={24} md={5} className='h-100'>
              <SystemsProvider>
                <SideBar onNew={() => createNew()}/>
              </SystemsProvider>
            </Col>
            <Col xs={24} md={19} className='h-100'>
              {sysID ? <NewMainStage/> : <DefaultMainStage/>}
            </Col>
          </Row>
        </Grid>
      </CustomProvider>
  );
}

export default App;

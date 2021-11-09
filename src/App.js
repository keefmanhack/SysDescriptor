import React, { useState } from 'react';
import { Grid, Row, Col, CustomProvider} from "rsuite";
import {ref, push, get, set } from "firebase/database";
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
import { makeid } from './misc/helperfunc';



function App() {
  const [sysID, setSysID] = useState(null);
  const createNew = async () => {
    const genRef = ref(database, `systems/`);
    const newSysData = {
        timestamp: firebase.database.ServerValue.TIMESTAMP,
        system: `${Date.now()}${makeid(5)}`,
        atc: `${Date.now()}${makeid(5)}`,
        acses: `${Date.now()}${makeid(5)}`
    }
    try{
      const id = await push(genRef, newSysData).key;
      setSysID(id);
    }catch(err){
      alert(err);
      console.log(err);
    }
  }

  const deleteSys = async id => {
    //  get the System so that I can delete the acses, atc, and system portions first
    const sysRef = ref(database, `systems/${id}`);
    let sys
    try{
      sys = (await get(sysRef)).val();
    }catch(err){
      console.log(err);
      alert(err);
    }
    //  then if that went well I need to delete each of those three ^
    const {acses, atc, system} = sys;
    const refs = [ref(database, `acses/${acses}`), ref(database, `atc/${atc}`), ref(database, `system/${system}`), sysRef]
    try{
      await Promise.all(refs.map(async (r) => {
        await set(r, null);
      }))

      
    }catch(err){
      console.log(err);
      alert(err);
    }
    setSysID(null);
  }


  return (
    <CustomProvider theme='dark'>
       <TitleBar/>
        <Grid fluid className='h-100' style={{padding:0}}>
          <Row className='h-100'>
            <Col xs={24} lg={6} className='h-100'>
              <SystemsProvider>
                <SideBar onSysDeleted={(id) => deleteSys(id)} selectedID={sysID} onSysSelected={(id) => setSysID(id)} onNew={() => createNew()}/>
              </SystemsProvider>
            </Col>
            <Col xs={24} lg={18} className='h-100'>
              {sysID ? <NewMainStage sysID={sysID} /> : <DefaultMainStage/>}
            </Col>
          </Row>
        </Grid>
      </CustomProvider>
  );
}

export default App;

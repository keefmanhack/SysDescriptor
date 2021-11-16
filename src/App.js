import React, { useState } from 'react';
import { Grid, Row, Col} from "rsuite";
import {ref, push, get, set } from "firebase/database";
import firebase from 'firebase/compat/';
import database from './misc/firebase';

import TitleBar from './Components/TitleBar';
import SideBar from './Components/SideBar/SideBar';
import { SystemsProvider } from './Contexts/systems.context';
import DefaultMainStage from './Components/MainStage/DefaultMainStage';
import NewMainStage from './Components/MainStage/NewMainStage';
import Footer from './Components/Footer';
import Alert from './misc/Alert';


import './styles/main.scss';
import './styles/utility.scss';
import 'rsuite/dist/rsuite.min.css';
import { makeid } from './misc/helperfunc';
import { ThemeProvider } from './Contexts/theme.context';

function App() {
  const [theme, setTheme] = useState('dark')
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
      Alert.success(`Created new System Description`);
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
      Alert.error(err.message);
    }
    //  then if that went well I need to delete each of those three ^
    const {acses, atc, system} = sys;
    const refs = [ref(database, `acses/${acses}`), ref(database, `atc/${atc}`), ref(database, `system/${system}`), sysRef]
    try{
      await Promise.all(refs.map(async (r) => {
        await set(r, null);
      }))
      Alert.info(`System Description for ${sys.name || 'Untitled'} deleted`);
    }catch(err){
      console.log(err);
      Alert.error(err.message);
    }
    setSysID(null);
  }


  return (
    <ThemeProvider theme={theme}>
      <div>
       <TitleBar style={{}} setTheme={(t) => setTheme(t)}/>
        <Grid fluid  style={{padding:0}}>
          <Row >
            <Col xs={24} lg={6} >
              <SystemsProvider>
                <SideBar onSysDeleted={(id) => deleteSys(id)} selectedID={sysID} onSysSelected={(id) => setSysID(id)} onNew={() => createNew()}/>
              </SystemsProvider>
            </Col>
            <Col xs={24} lg={18} >
              {sysID ? <NewMainStage sysID={sysID} /> : <DefaultMainStage/>}
            </Col>
          </Row>
        </Grid>
        <Footer style={{width: '100%'}}/>
        </div>
        </ThemeProvider>
  );
}

export default App;

import React, { useState } from 'react';
import { Grid, Row, Col} from "rsuite";
import {ref, push, get, set} from "firebase/database";
import firebase from 'firebase/compat/';
import database from './misc/firebase';

import TitleBar from './Components/TitleBar';
import SideBar from './Components/SideBar/SideBar';
import { SystemsProvider } from './Contexts/systems.context';
import DefaultMainStage from './Components/MainStage/Extensions/DefaultMainStage';
import NewMainStage from './Components/MainStage/Extensions/NewMainStage';
import Footer from './Components/Footer';
import Alert from './misc/Alert';


import './styles/main.scss';
import './styles/utility.scss';
import 'rsuite/dist/rsuite.min.css';
import { makeid } from './misc/helperfunc';
import { ThemeProvider } from './Contexts/theme.context';

function App() {
  const [theme, setTheme] = useState('dark')
  const [revID, setRevID] = useState(null);
  const [sysID, setSysID] = useState(null);

  const hideMainStage = () => {setRevID(null); setSysID(null);}

  const createNewRev = async (sysID) => {
    hideMainStage();
    try {
      //  create generalSubSystem
      const subSysRef = ref(database, `subSystems/`);
      const genSubSysID  = await push(subSysRef, {name: 'General'}).key;
      //  create revision
      const revRef = ref(database, `revisions/`);
      const newRevData = {
          timestamp: firebase.database.ServerValue.TIMESTAMP,
          subSystems : [genSubSysID],
          notes: `${Date.now()}${makeid(5)}`
      }
      const revID = await push(revRef, newRevData).key;
      //  add to system list
      const revIDsRef = ref(database, `systems/${sysID}/revIDs`);
      const revIDsCurrArr = (await get(revIDsRef)).val() || []; 
      await set(revIDsRef, [...revIDsCurrArr, revID]);

      setRevID(revID);
      Alert.success('New revision created!');
    }catch(err){;
      Alert.error(err);
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
    hideMainStage()
  }


  return (
    <ThemeProvider theme={theme}>
      <div>
       <TitleBar setTheme={(t) => setTheme(t)}/>
        <Grid fluid  style={{padding:0}}>
          <Row >
            <Col xs={24} lg={6} >
              <SystemsProvider>
                <SideBar 
                  onSysDeleted={(id) => deleteSys(id)} 
                  revSelectedID={revID}
                  sysSelectedID={sysID}
                  onNewRevision={(sysID)=>createNewRev(sysID)}
                  onRevSelected={(sysID, revID)=> {setSysID(sysID); setRevID(revID); }}
                />
              </SystemsProvider>
            </Col>
            <Col xs={24} lg={18} >
              {revID ? <NewMainStage revID={revID}/> : <DefaultMainStage/>}
            </Col>
          </Row>
        </Grid>
        <Footer style={{width: '100%'}}/>
        </div>
        </ThemeProvider>
  );
}

export default App;

import React, { useState } from 'react';
import { Grid, Row, Col} from "rsuite";

import TitleBar from './Components/TitleBar';
import SideBar from './Components/SideBar/SideBar';
import DefaultMainStage from './Components/MainStage/Extensions/DefaultMainStage';
import NewMainStage from './Components/MainStage/Extensions/NewMainStage';
import Footer from './Components/Footer';


import './styles/main.scss';
import './styles/utility.scss';
import 'rsuite/dist/rsuite.min.css';
import { ThemeProvider } from './Contexts/theme.context';
import { RevisionDB } from './Database/SystemDB/RevisionDB/RevisionDB';

function App() {
  const [theme, setTheme] = useState('dark')
  const [revID, setRevID] = useState(null);
  const [sysID, setSysID] = useState(null);

  // const hideMainStage = () => {setRevID(null); setSysID(null);}

  const onNewRevision = async (sysID) => {
    const revID = await RevisionDB.create(sysID);
    setSysID(sysID);
    setRevID(revID);
  }
  
  const onDeleteSys = () => {}



  return (
    <ThemeProvider theme={theme}>
      <div>
       <TitleBar setTheme={(t) => setTheme(t)}/>
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

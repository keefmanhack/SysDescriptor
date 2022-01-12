import React, {useState} from 'react';
import { Grid, Row, Col} from "rsuite";

import { ThemeProvider } from '../../Contexts/theme.context';
import { RevisionDB } from '../../Database/SystemDB/RevisionDB/RevisionDB';
import HeaderBar from '../misc/HeaderBar';
import SideBar from '../SideBar/SideBar';
import DefaultMainStage from '../MainStage/Extensions/DefaultMainStage';
import NewMainStage from '../MainStage/Extensions/NewMainStage';
import MyFooter from '../misc/Footer';

export default function Main() {
    const [theme, setTheme] = useState('dark')
    const [revID, setRevID] = useState(null);
    const [sysID, setSysID] = useState(null);
  
    const onNewRevision = async (sysID) => {
      const revID = await RevisionDB.create(sysID);
      setSysID(sysID);
      setRevID(revID);
    }
    
    return (
        <ThemeProvider theme={theme}>
            <div>
                <HeaderBar setTheme={(t) => setTheme(t)}/>
                <Grid fluid  style={{padding:0}}>
                    <Row >
                    <Col xs={24} lg={7} >
                        <SideBar 
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
                <MyFooter style={{width: '100%'}}/>
            </div>
        </ThemeProvider>
    )
}

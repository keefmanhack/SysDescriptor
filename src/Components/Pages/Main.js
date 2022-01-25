import React, {useState} from 'react';
import { Grid, Row, Col} from "rsuite";

import { ThemeProvider } from '../../Contexts/theme.context';
import HeaderBar from '../misc/HeaderBar';
import SideBar from '../SideBar/SideBar';
import MyFooter from '../misc/Footer';
import { SelectionProvider } from '../../Contexts/selection.context';
import ContentContainer from '../Content Container/ContentContainer';

export default function Main() {
    const [theme, setTheme] = useState('dark')
      
    return (
        <ThemeProvider theme={theme}>
            <div>
                <HeaderBar setTheme={(t) => setTheme(t)}/>
                <SelectionProvider>
                    <Grid fluid  style={{padding:0}}>
                        <Row >
                            <Col xs={24} lg={7} >
                                <SideBar />
                            </Col>
                            <Col xs={24} lg={17} >
                                <ContentContainer/>
                            </Col>
                        </Row>
                    </Grid>
                </SelectionProvider>
                <MyFooter style={{width: '100%'}}/> 
            </div>
        </ThemeProvider>
    )
}

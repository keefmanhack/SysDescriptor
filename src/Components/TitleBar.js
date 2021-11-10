import React from 'react';
import { Navbar } from 'rsuite';
import {version} from '../../package.json';

const TitleBar = ({style}) => 
    (
        <Navbar style={style}>
            <Navbar.Brand >
                <span >SysDescriptor {version}</span>
            </Navbar.Brand>
        </Navbar>
    )
export default TitleBar;
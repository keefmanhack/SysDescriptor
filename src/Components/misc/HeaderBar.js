import React from 'react';
import {Navbar, Nav } from 'rsuite';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

import ButtonToggle from './Helper Components/ButtonToggle';


import {version} from '../../../package.json';

const lightDarkDisp = [
    {
        disp: <FontAwesomeIcon icon={faMoon}/>,
        value: "dark"
    },
    {
        disp: <FontAwesomeIcon icon={faSun}/>,
        value: "light"
    }
]



const HeaderBar = ({style, setTheme}) => 
    (
        <Navbar style={{...style}}>
            <Navbar.Brand style={{paddingLeft: '5px'}}>
                <span >SysDescriptor {version}</span>
            </Navbar.Brand>
            <Nav pullRight>
                <ButtonToggle
                    options={lightDarkDisp}
                    onChange={(e) => setTheme(e)}
                    style={{marginTop: '10px', marginRight: '5px'}}
                    size='xs'
                />
            </Nav>
        </Navbar>
    )
export default HeaderBar;
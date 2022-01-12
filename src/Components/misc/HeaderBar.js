import React, { useState} from 'react';
import { signOut } from 'firebase/auth';
import {Navbar, Nav, Button, Drawer } from 'rsuite';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

import ButtonToggle from './Helper Components/ButtonToggle';


import {version} from '../../../package.json';
import { useUser } from '../../Contexts/user.context';

import { auth } from '../../misc/firebase';
import Alert from '../../misc/Alert';

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



const HeaderBar = ({style, setTheme}) => {
    const [drawIsOpen, setDrawIsOpen] = useState(false);
    const {user} = useUser();

    const handleSignOut = () => {
        signOut(auth).then(()=>{

        }
        ).catch((err) => {
            Alert.error(err.message);
        })
    }

    return(
        <>
            <Navbar style={{...style}}>
                <Navbar.Brand >
                    SYSDESCRIPTOR {version}
                </Navbar.Brand>
                <Nav pullRight style={{marginTop: '0px'}}>
                <Button onClick={()=>setDrawIsOpen(true)} appearance='link'>{user.email}</Button>
                <ButtonToggle
                    options={lightDarkDisp}
                    onChange={(e) => setTheme(e)}
                    style={{marginBottom: '5px', marginRight: '5px', textAlign: 'right'}}
                    size='xs'
                />
                </Nav>
            </Navbar>

            <Drawer size='xs' placement='right' open={drawIsOpen} onClose={() =>setDrawIsOpen(false)}>
                <Drawer.Header>
                    <Drawer.Title>{user.email}</Drawer.Title>
                </Drawer.Header>
                <Drawer.Body>
                        <Button block appearance='primary' color='red' onClick={handleSignOut}>Sign Out</Button>
                    </Drawer.Body>
            </Drawer>
        </>

    )
}

export default HeaderBar;




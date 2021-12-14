import React, { useEffect, useState } from 'react';
import { Nav } from 'rsuite';
import CloseIcon from '@rsuite/icons/Close';
import { SubSystemDB } from '../../Database/SystemDB/RevisionDB/SubSystemDB/SubSystemDB';
import dataFormat from '../../misc/dataFormat.json';
import ComponentHandler from './ComponentHandler/ComponentHandler';

const SubSystemNav = ({subSystems=[], revID}) => {
    const [selectedID, setselectedID] = useState();
    const [selectedName, setSelectedName] = useState();

    useEffect(() => {
        if(!selectedID && subSystems[0]){
            setselectedID(subSystems[0].id);
            setSelectedName(subSystems[0].name);
        }
    }, [subSystems])

    const createSubSystemNavs = () => (
        subSystems.map((subSys) => {
            const {name, id} = subSys;
            const isActive = id===selectedID;
            const btnColor = isActive ? 'red' : null;
            return (
                <Nav.Item 
                    onClick={()=>{setselectedID(id); setSelectedName(name)}} 
                    key={id} 
                    active={isActive}
                >
                    {name}
                    <button 
                        style={{background: 'transparent', color: btnColor, fontSize: '12px', position: 'relative', top:'-2px', left: '3px'}} 
                        type='button'
                        onClick={(e) => {e.stopPropagation(); SubSystemDB.deleteSpecific(revID, id); setSelectedName(null); setselectedID(null)}}
                        disabled={!isActive}
                    > 
                        <CloseIcon/> 
                    </button>
                </Nav.Item>
            )
        })
    )

    return (
        <div>
            <Nav appearance="tabs">
                {createSubSystemNavs()}
            </Nav>
            {selectedID && dataFormat[selectedName] ? 
                <ComponentHandler subSysID={selectedID} subSysFormat={dataFormat[selectedName]}/>
            :
                <div className='muted-c mx-auto w-100'>
                    Select a subsystem to begin editing.
                </div>    
            }
        </div>
    );
};

export default SubSystemNav;
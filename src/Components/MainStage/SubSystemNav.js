import React, { useEffect, useState } from 'react';
import { Nav } from 'rsuite';
import CloseIcon from '@rsuite/icons/Close';
import { SubSystemDB } from '../../Database/SystemDB/RevisionDB/SubSystemDB/SubSystemDB';

const SubSystemNav = ({subSystems=[], revID}) => {
    const [selectedSubSys, setSelectedSubSys] = useState();

    useEffect(() => {
        if(!selectedSubSys && subSystems[0]){
            setSelectedSubSys(subSystems[0].id);
        }
    }, [subSystems])

    const createSubSystemNavs = () => (
        subSystems.map((subSys) => {
            const {name, id} = subSys;
            const isActive = id===selectedSubSys
            const btnColor = isActive ? 'red' : null;
            return (
                <Nav.Item 
                    onClick={()=>setSelectedSubSys(id)} 
                    key={id} 
                    active={isActive}
                >
                    {name}
                    <button 
                        style={{background: 'transparent', color: btnColor, fontSize: '12px', position: 'relative', top:'-2px', left: '3px'}} 
                        type='button'
                        onClick={(e) => {e.stopPropagation(); SubSystemDB.deleteSpecific(revID, id)}}
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
            
        </div>
    );
};

export default SubSystemNav;
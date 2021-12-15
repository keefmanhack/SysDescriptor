import React, { useEffect, useState } from 'react';
import { Nav } from 'rsuite';
import CloseIcon from '@rsuite/icons/Close';
import { SubSystemDB } from '../../Database/SystemDB/RevisionDB/SubSystemDB/SubSystemDB';
import ComponentHandler from './ComponentHandler/ComponentHandler';

const SubSystemNav = ({subSystems=[], revID}) => {
    const [selI, setSelI] = useState(null);

    useEffect(() => {
        setSelI(null);
    }, [revID]);

    const handleDelete = () => {
        if(selI-1 >=0){
            setSelI(i=>i-1);
        }else{
            setSelI(null);
        }

    }

    const createSubSystemNavs = () => (
        subSystems.map((subSys, i) => {
            const {name, id} = subSys;
            const isActive = i===selI;
            const btnColor = isActive ? 'red' : null;
            return (
                <Nav.Item 
                    onClick={()=>setSelI(i)} 
                    key={id} 
                    active={isActive}
                >
                    {name}
                    <button 
                        style={{background: 'transparent', color: btnColor, fontSize: '12px', position: 'relative', top:'-2px', left: '3px'}} 
                        type='button'
                        onClick={(e) => {e.stopPropagation(); SubSystemDB.deleteSpecific(revID, id); handleDelete()}}
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
            {selI!==null ? 
                <ComponentHandler subSysID={subSystems[selI].id} dataKey={subSystems[selI].name}/>
            :
                <div className='muted-c mx-auto w-100'>
                    Select a subsystem to begin editing.
                </div>    
            }
        </div>
    );
};

export default SubSystemNav;
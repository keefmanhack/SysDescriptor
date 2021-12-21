import React, { useEffect, useState } from 'react';
import { Nav } from 'rsuite';
import CloseIcon from '@rsuite/icons/Close';
import { SubSystemDB } from '../../../Database/SystemDB/RevisionDB/SubSystemDB/SubSystemDB';
import ComponentHandler from './ComponentHandler/ComponentHandler';
import Alert from '../../../misc/Alert';
import { useToolBar } from '../../../Contexts/toolbar.context';

const SubSystemNav = ({subSystems=[], revID}) => {
    const {setIsUpdating} = useToolBar();
    const [selI, setSelI] = useState(null);

    useEffect(() => {
        if(subSystems.length>0){
            setSelI(0);
        }else{
            setSelI(null);
        }
    }, [revID]);

    const handleDelete = async (id, name) => {
        setIsUpdating(true);
        try{
            await SubSystemDB.deleteSpecific(revID, id);


            if(selI-1 >=0){
                setSelI(i=>i-1);
            }else{
                setSelI(null);
            }


            Alert.success(`Deleted subsystem ${name}`)
        }catch(err){
            Alert.error(err);
        }
        setIsUpdating(false);
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
                        onClick={(e) => {e.stopPropagation(); handleDelete(id, name)}}
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
            {selI!==null && subSystems.length>0 && subSystems[selI] ? 
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
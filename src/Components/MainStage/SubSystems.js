import React from 'react';
import { Button } from 'rsuite';
import { SubSystemDB } from '../../Database/SystemDB/RevisionDB/SubSystemDB/SubSystemDB';

const possSubs = {
    general: 'General',
    atc: 'ATC',
    acses: 'ACSES'
}


const SubSystems = ({subSystems, revID}) => {
    const handleAdd = async name => {
        await SubSystemDB.create(revID, name);
    }

    const hasATC = subSystems.find(v => v.name===possSubs.atc)
    const hasACSES = subSystems.find(v => v.name===possSubs.acses)
    const hasGeneral = subSystems.find(v => v.name===possSubs.general)
    return (
       <div style={{marginTop: '15px'}}>
            {hasGeneral ? null : <Button onClick={()=>handleAdd(possSubs.general)} appearance='ghost' size='xs' style={{display: 'block', marginBottom: '5px'}}>+ General</Button> }
            {hasATC ? null : <Button onClick={()=>handleAdd(possSubs.atc)} appearance='ghost' size='xs' style={{display: 'block', marginBottom: '5px'}}>+ ATC</Button> }
            {hasACSES ? null : <Button onClick={()=>handleAdd(possSubs.acses)} appearance='ghost' size='xs'>+ ACSES</Button> }
       </div>
    );
};

export default SubSystems;
import React from 'react';
import { Button } from 'rsuite';
import { SubSystemDB } from '../../Database/SystemDB/RevisionDB/SubSystemDB/SubSystemDB';
import { useSubSystems } from '../../misc/customHooks';

const possSubs = {
    general: 'General',
    atc: 'ATC',
    acses: 'ACSES'
}


const SubSystems = ({revID}) => {
    const subSystems = useSubSystems(revID);
    const handleAdd = async name => {
        await SubSystemDB.create(revID, name);
    }

    const hasATC = subSystems.find(v => v.name===possSubs.atc)
    const hasACSES = subSystems.find(v => v.name===possSubs.acses)
    const hasGeneral = subSystems.find(v => v.name===possSubs.general)
    return (
       <>
            {hasGeneral ? null : <Button onClick={()=>handleAdd(possSubs.general)} appearance='ghost' size='xs' style={{display: 'block', marginBottom: '5px', marginTop: '15px'}}>+ General</Button> }
            {hasATC ? null : <Button onClick={()=>handleAdd(possSubs.atc)} appearance='ghost' size='xs' style={{display: 'block', marginBottom: '5px'}}>+ ATC</Button> }
            {hasACSES ? null : <Button onClick={()=>handleAdd(possSubs.acses)} appearance='ghost' size='xs'>+ ACSES</Button> }
       </>
    );
};

export default SubSystems;
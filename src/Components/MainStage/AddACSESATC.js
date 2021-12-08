import { get, push, ref } from 'firebase/database';
import React from 'react';
import { Button } from 'rsuite';
import Alert from '../../misc/Alert';
import database from '../../misc/firebase';

const AddACSESATC = ({subSystemsArr=[], revID}) => {

    const handleAdd = async name => {
        const revRef = ref(database, `revisions/${revID}/subSystems`);
        try{
            //  check to make sure the rev subSystem doesn't exist
            const subSys = (await get(revRef)).val();
            if(subSys.find(v=>v.name===name)){
                Alert.error(`This ${name} sub-component appears to already exist`);
                return;
            }
            //  if it doesn't exist then make the subSystem
            const subSysRef = ref(database, `subSystems/`);
            const subSysID = (await push(subSysRef, name)).key();
            //  then add it to the revision
            await push(revRef, subSysID);
        }catch(err){
            Alert.error(err);
            console.log(err);
        }
    }

    const hasATC = subSystemsArr.find((v) => v.name==='ATC');
    const hasACSES = subSystemsArr.find((v) => v.name==='ACSES');
    return (
       <>
            {hasATC ? null : <Button onClick={()=>handleAdd('ATC')} appearance='ghost' size='xs' style={{display: 'block', marginBottom: '5px', marginTop: '15px'}}>+ ATC</Button> }
            {hasACSES ? null : <Button onClick={()=>handleAdd('ACSES')} appearance='ghost' size='xs'>+ ACSES</Button> }
       </>
    );
};

export default AddACSESATC;
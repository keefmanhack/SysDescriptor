import React, { useEffect, useState } from 'react'
import { Input } from 'rsuite'
import { useSelection } from '../../../Contexts/selection.context'
import { useToolBar } from '../../../Contexts/toolbar.context'
import { RevisionDB } from '../../../Database/SystemDB/RevisionDB/RevisionDB'
import Alert from '../../../misc/Alert'
import MyNumberInput from '../../Custom Inputs/MyNumberInput'

export const TitleBar = () => {
    const {selRevID, selSysID} = useSelection();

    const {setIsUpdating} = useToolBar();
    const [isDisabled, setIsDisabled] = useState(false);
    const [name, setName] = useState('');
    const [revNum, setRevNum] = useState(0);


    useEffect(() => {
        const loadRev = async () => {
            setIsDisabled(true);
            try{
                const {name, revNumber} =  await RevisionDB.readSpecific(selSysID, selRevID);
                setName(name || '');
                setRevNum(revNumber || 0);
            }catch(err){
                Alert.error(err.message);
            }
            setIsDisabled(false);
        }

        loadRev();

    }, [selRevID, selSysID])

    const handleUpdate = async (key, val) => {
        setIsUpdating(true);
        try{
            await RevisionDB.updateByKey(selSysID, selRevID, key, val)
        }catch(err){
            Alert.error(err);
        }
        setIsUpdating(false);
    }


    return (
        <>
            <div>
                <Input value={name} disabled={isDisabled} size='lg' onChange={(v) => {handleUpdate('name', v); setName(v)}} style={{textAlign: 'center', fontSize: '24px'}} placeholder='Revision Name'/>
            </div>
            <div >
                <label style={{fontSize: '14px'}} htmlFor='rev'>Rev. Number</label>
                <MyNumberInput value={revNum} disabled={isDisabled} onChange={(v) => {handleUpdate('revNumber', v); setRevNum(v)}} size='sm'/>
            </div>
        </>
    )
}

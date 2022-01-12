import React, { useState, useEffect } from 'react';
import { Button, Drawer, Input } from 'rsuite';
import { useToolBar } from '../../../Contexts/toolbar.context';
import {NotesDB} from '../../../Database/SystemDB/RevisionDB/NotesDB/NotesDB';

export const NotesDrawer = ({isOpen,revID,onClose}) => {
    const [isEnlarged, setIsEnlarged] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [value, setValue] = useState('');
    
    const {setIsUpdating}=useToolBar();

    useEffect(()=> {
        const getValue = async () => {
            setValue('');
            const v = await NotesDB.read(revID);
            setValue(v);
            setIsLoading(false);
        }

        getValue();
    }, [revID]);

    const handleUpdate = async (v) => {
        setIsUpdating(true);
        await NotesDB.update(revID, v);
        setIsUpdating(false);
    }


    return (
        <Drawer size={isEnlarged ? 'lg' : 'xs'} backdrop={false} placement='bottom' open={isOpen} onClose={onClose}>
        <Drawer.Header>
        <Drawer.Title>Notes</Drawer.Title>
        <Drawer.Actions>
            <Button onClick={()=>setIsEnlarged(v=>!v)}>Expand</Button>
            <Button onClick={onClose} appearance="primary">
            Close
            </Button>
        </Drawer.Actions>
        </Drawer.Header>
        <Drawer.Body>
            <Input as='textarea' value={value} disabled={isLoading} onChange={(v) => {setValue(v); handleUpdate(v)}} rows={isEnlarged ? 20 : 5} placeholder="Write any related notes here..."/>
        </Drawer.Body>
    </Drawer>
    )
}


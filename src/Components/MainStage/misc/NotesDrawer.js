import React, { useState } from 'react';
import { Button, Drawer } from 'rsuite';

export const NotesDrawer = ({onClose, isOpen, name}) => {
    const [isEnlarged, setIsEnlarged] = useState(false);
    if(!isOpen){return null}
    return (
        <Drawer size={isEnlarged ? 'lg' : 'xs'} backdrop={false} placement='bottom' open={isOpen} onClose={onClose}>
        <Drawer.Header>
        <Drawer.Title>Notes - {name|| "Untitled"}</Drawer.Title>
        <Drawer.Actions>
            <Button onClick={()=>setIsEnlarged(v=>!v)}>Expand</Button>
            <Button onClick={onClose} appearance="primary">
            Close
            </Button>
        </Drawer.Actions>
        </Drawer.Header>
        <Drawer.Body>
            {/* <DBTextAreaInput
                style={{width: '100%', fontSize: '14px', transition: '.3s'}}
                dbPath={`notes/${id}`}
                onChange={(e, path) => onChange(e, path)}
                title=""
                rows={isEnlarged ? 20 : 5}
                placeholder="Write any related notes here..."
            /> */}
        </Drawer.Body>
    </Drawer>
    )
}

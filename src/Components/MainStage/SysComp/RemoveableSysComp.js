import React from 'react';
import { Button } from 'rsuite';
import SysComp from './SysComp';

const RemoveableSysComp = ({title, compProperties, onRemove}) => (
        <SysComp
            title={title}
            compProperties={compProperties}
            removeButton={
                <Button onClick={onRemove} style={{float: 'right'}} size='xs' color='orange' appearance='subtle'>
                    Remove
                </Button>
            }
        />
)

export default RemoveableSysComp;
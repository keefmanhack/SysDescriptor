import React from 'react';
import { Loader } from 'rsuite';
import { useRevisions } from '../../../../misc/customHooks';
import {Revision} from './Revision/Revision';

const RevList = ({sysID, onRevSelected, revSelectedID}) => {
    const {revs, isUpdating} = useRevisions(sysID);

    return (
        <div className='rs-list rs-list-hover v-scroll' style={{marginLeft: '10%'}}>
            {isUpdating ? <Loader style={{padding: '10px'}}/> : null}
            {!isUpdating && revs ? revs.map(val => {
                const {id, name, timestamp, revNumber} = val;
                    return(
                    <Revision 
                        onSelected={()=>onRevSelected(id)}
                        name={name}
                        timestamp={timestamp}
                        revNumber={revNumber}
                        key={id}
                        isSelected={revSelectedID===id}
                    />
                )
            }): null}
            {!isUpdating && !revs.length ? <span className='muted-c' style={{padding: '5px 0', display: 'block'}}>Create a new revision to get started</span> : null}
        </div>
    );
};

export default RevList;
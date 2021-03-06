import React from 'react';
import { Loader } from 'rsuite';
import { useSelection } from '../../../../Contexts/selection.context';
import { useRevisions } from '../../../../misc/customHooks';
import {Revision} from './Revision/Revision';

const RevList = ({sysID}) => {
    const {selRevID, setSelection} = useSelection();

    const {revs, isUpdating} = useRevisions(sysID);

    return (
        <div className='rs-list rs-list-hover v-scroll' style={{marginLeft: '10%'}}>
            {isUpdating ? <Loader style={{padding: '10px'}}/> : null}
            {!isUpdating && revs ? revs.map(val => {
                const {id, name, timestamp, revNumber} = val;
                    return(
                    <Revision 
                        onSelected={()=>setSelection(id, sysID)}
                        name={name}
                        timestamp={timestamp}
                        revNumber={revNumber}
                        key={id}
                        isSelected={selRevID===id}
                        id={id}
                        sysID={sysID}
                    />
                )
            }): null}
            {!isUpdating && !revs.length ? <span className='muted-c' style={{padding: '5px 0', display: 'block'}}>Create a new revision to get started</span> : null}
        </div>
    );
};

export default RevList;
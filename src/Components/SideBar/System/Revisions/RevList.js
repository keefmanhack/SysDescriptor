import React from 'react';
import { Loader } from 'rsuite';
import { useRevisions } from '../../../../misc/customHooks';
import {Revision} from './Revision';

const RevList = ({id, onRevSelected, revSelectedID}) => {
    const [revData, isUpdating] = useRevisions(id);
    return (
        <div className='rs-list rs-list-hover v-scroll' style={{marginLeft: '10%'}}>
            {isUpdating ? <Loader style={{padding: '10px'}}/> : null}
            {!isUpdating && revData ? revData.map(val => {
                const {id, name, timestamp, revisionNumber} = val;
                    return(
                    <Revision 
                        onSelected={()=>onRevSelected(id)}
                        name={name}
                        timestamp={timestamp}
                        revisionNumber={revisionNumber}
                        key={id}
                        isSelected={revSelectedID===id}
                    />
                )
            }): null}
        </div>
    );
};

export default RevList;
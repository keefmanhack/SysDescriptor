import React from 'react';
import { useSelection } from '../../Contexts/selection.context';
import RevisionEditor from '../RevisionEditor/RevisionEditor';
import NoneSelectedComp from './NoneSelectedComp';

const ContentContainer = () => {
    const {noneSelected} = useSelection();
    return (
        <div id='content-container' style={{height: '100vh'}}>
            {noneSelected ? 
                <NoneSelectedComp/>
            :
                <RevisionEditor/>
            }
        </div>

    )
}

export default ContentContainer;
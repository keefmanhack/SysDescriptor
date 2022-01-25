import { faRedo, faUndo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Button, ButtonGroup, ButtonToolbar } from 'rsuite';
import { useToolBar } from '../../../Contexts/toolbar.context';
import SavedIndicator from './SavedIndicator';



const ToolBar = () => {
    const {isUpdating} = useToolBar();
    return (
        <div>
            <ButtonToolbar style={{display: 'inline'}}>
                <ButtonGroup>
                    <Button size='xs' disabled appearance='subtle'><FontAwesomeIcon icon={faUndo}/></Button>
                    <Button size='xs' disabled appearance='subtle'><FontAwesomeIcon icon={faRedo}/></Button>
                </ButtonGroup>
            </ButtonToolbar>
            <span style={{marginRight: '5px', marginLeft: '5px', borderRight: '1px solid white'}}/>
            <SavedIndicator isUpdating={isUpdating}/>
        </div>
    );
};

export default ToolBar;
import React from 'react';
import MainStage from '../MainStage';

const DefaultMainStage = ({style}) => (
        <MainStage
            style={style}
            defaultComp={
                <h1 
                    className='muted-c' 
                    style={{paddingTop: '300px', fontSize: '34px', textAlign: 'center'}}
                >        
                    Create a <strong>New Description</strong> or Edit a <strong >Previous Version</strong>
                </h1>
            }
        />
    );

export default DefaultMainStage;
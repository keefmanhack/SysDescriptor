import React from 'react';
import MainStage from './MainStage';

const DefaultMainStage = () => (
        <MainStage
            defaultComp={
                <h1 
                    className='muted-c' 
                    style={{paddingTop: '300px', fontSize: '34px', textAlign: 'center'}}
                >        
                    Create a New Description or Edit a Previous Version
                </h1>
            }
        />
    );

export default DefaultMainStage;
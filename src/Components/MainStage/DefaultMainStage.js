import React from 'react';
import MainStage from './MainStage';

const DefaultMainStage = () => (
        <MainStage
            defaultComp={
                <h1 
                    className='muted-c' 
                    style={{paddingTop: '300px', fontSize: '34px', textAlign: 'center'}}
                >        
                    Create a <span style={{color: 'lightgreen'}}>New Description</span> or Edit a <span style={{color: "yellow"}}>Previous Version</span>
                </h1>
            }
        />
    );

export default DefaultMainStage;
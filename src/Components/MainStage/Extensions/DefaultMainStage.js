import React from 'react';
import MainStage from '../MainStage';

const DefaultMainStage = ({style}) => (
        <MainStage
            style={style}
            defaultComp={
                <h1 
                    className='muted-c' 
                    style={{paddingTop: '10vh', fontSize: '2vw', textAlign: 'center'}}
                >        
                    Create a <strong>New Description</strong> or Edit a <strong >Previous Version</strong>
                </h1>
            }
        />
    );

export default DefaultMainStage;
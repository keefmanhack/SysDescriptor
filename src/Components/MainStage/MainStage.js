import React from 'react';




const styles = {
    backgroundColor: 'rgb(40 40 40 / 1)',
    height: '100vh'
}

const MainStage = ({newStageComp, defaultComp}) => (
        <div style={styles}>
            {newStageComp}
            {defaultComp}
        </div>

    )
export default MainStage;
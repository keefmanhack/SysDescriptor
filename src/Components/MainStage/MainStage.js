import React from 'react';
import { useTheme } from '../../Contexts/theme.context';


const styles = {
    height: '100vh'
}

const MainStage = ({newStageComp, defaultComp, style}) => {
    const isDark = (useTheme()) === "dark";
    return (
        <div style={{...styles, ...style, backgroundColor: isDark ? '#282828' : '#e6ebeb'}}>
        {newStageComp}
        {defaultComp}
    </div>
    )
}
export default MainStage;
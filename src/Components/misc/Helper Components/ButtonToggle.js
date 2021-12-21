import React, { useState } from 'react';
import { ButtonGroup, ButtonToolbar, Button } from 'rsuite';

const ButtonToggle = ({options=[], defaultIndex=0, onChange, style, size, justified=false}) => {
    const [selectedIndex, setSelectedIndex] = useState(defaultIndex);

    const handleChange = i => {
        setSelectedIndex(i);
        onChange(options[i].value)
    }


    const opt = options.map((val,i) => 
        <Button  
            onClick={()=>handleChange(i)} 
            key={i}
            appearance={selectedIndex===i ? 'primary' : 'ghost'}
            size={size}
        >
            {val.disp}
        </Button>
    )


    
    return (
        <ButtonToolbar style={style}>
            <ButtonGroup justified={justified}>
                {opt}
            </ButtonGroup>
        </ButtonToolbar>
    );
};

export default ButtonToggle;
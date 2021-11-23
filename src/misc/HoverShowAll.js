import React from 'react';
import { Tooltip, Whisper } from 'rsuite';

const HoverShowAll = ({text="missing", children}) => {
    const tooltip = (
        <Tooltip full>
          {text}
        </Tooltip>
      );

    return (
        <Whisper placement="topLeft" controlId="control-id-hover" trigger="hover" speaker={tooltip}>
            {children}
        </Whisper>
    );
};

export default HoverShowAll;
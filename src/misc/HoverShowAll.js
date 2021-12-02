import React from 'react';
import { Tooltip, Whisper } from 'rsuite';

const HoverShowAll = ({text="missing", children}) => {
    const tooltip = (
        <Tooltip>
          {text}
        </Tooltip>
      );

    return (
        <Whisper placement="top" controlId="control-id-hover" trigger="hover" speaker={tooltip}>
            {children}
        </Whisper>
    );
};

export default HoverShowAll;
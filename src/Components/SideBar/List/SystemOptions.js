import React from 'react'
import { Dropdown, Popover } from 'rsuite';


export const SystemOptions = React.forwardRef(({ onNewRevision, ...rest }, ref) => (
    <Popover ref={ref} {...rest} full>
      <Dropdown.Menu >
        <Dropdown.Item onClick={()=>onNewRevision()} >New Revision</Dropdown.Item>
        <Dropdown.Item onClick eventKey={2}>Edit System</Dropdown.Item>
        <Dropdown.Item eventKey={3}>Delete System</Dropdown.Item>
      </Dropdown.Menu>
    </Popover>
  ));

import React from 'react'
import { Dropdown, Popover } from 'rsuite';


export const SystemOptions = React.forwardRef(({ onSelect, ...rest }, ref) => (
    <Popover ref={ref} {...rest} full>
      <Dropdown.Menu onSelect={onSelect}>
        <Dropdown.Item eventKey={1}>New Revision</Dropdown.Item>
        <Dropdown.Item eventKey={2}>Delete System</Dropdown.Item>
      </Dropdown.Menu>
    </Popover>
  ));

import React, { useRef } from 'react'
import { Button, Dropdown, Popover, Whisper } from 'rsuite';
import MoreIcon from '@rsuite/icons/More';


const OptionsPopOver = React.forwardRef(({ handleSelect, ...rest }, ref) => (
    <Popover ref={ref} {...rest} full>
      <Dropdown.Menu onSelect={(n, e)=>{handleSelect(n); e.stopPropagation()}}>
        <Dropdown.Item eventKey={-1} className='muted-c'>Track</Dropdown.Item> 
        <Dropdown.Item eventKey={2}>Delete</Dropdown.Item>
      </Dropdown.Menu>
    </Popover>
));



export const CompItemOptions = ({onTrack, onDelete}) => {
  const ref = useRef();
  const handleSelect = n => {
    if(n===1){
        onTrack();
    }else if(n===2){
        onDelete();
    }

    ref.current.close();
  }
  return (
    <Whisper
        placement="rightStart"
        controlId="control-id-with-dropdown"
        trigger="click"
        ref={ref}
        onClick={(e)=>e.stopPropagation()}
        speaker={<OptionsPopOver handleSelect={e=>handleSelect(e)}/>}                              
    >
      <Button appearance='subtle' size='xs'><MoreIcon/></Button>
    </Whisper>
  )
}

import React, { useRef } from 'react'
import { Button, Dropdown, Popover, Whisper } from 'rsuite';
import MoreIcon from '@rsuite/icons/More';


const PopOver = React.forwardRef(({nameEvtObj=[], handleSelect, ...rest }, ref) => {
    const items = nameEvtObj.map((v, i) => {
        return <Dropdown.Item eventKey={i} key={i}>{v.name}</Dropdown.Item>
    })

    return (
        <Popover ref={ref} {...rest} full>
            <Dropdown.Menu onSelect={(n, e)=>{e.stopPropagation(); handleSelect(n); }}>
                {items}
            </Dropdown.Menu>
        </Popover>
    )
});


/* 
nameEvtObj = [
    {
        name: ,
        eventHandler: ,
    }, ...
]
*/


export const OptionsPopUp = ({nameEvtObj=[]}) => {
  const ref = useRef();

  const handleSelect = (n) => {
      nameEvtObj[n].eventHandler();
      ref.current.close();
  }

  return (
    <Whisper
        placement="rightStart"
        controlId="control-id-with-dropdown"
        trigger="click"
        ref={ref}
        onClick={(e)=>e.stopPropagation()}
        speaker={<PopOver nameEvtObj={nameEvtObj} handleSelect={handleSelect}/>}                              
    >
      <Button onClick={(e)=>e.stopPropagation()} appearance='subtle' size='xs'><MoreIcon/></Button>
    </Whisper>
  )
}

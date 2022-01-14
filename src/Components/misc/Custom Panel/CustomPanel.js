import { ArrowDownLine } from '@rsuite/icons';
import React, {useState } from 'react';
import HoverShowAll from '../Helper Components/HoverShowAll';


const CustomPanel = ({defaultExpand=false, header, children}) => {
    const [isExpanded, setIsExpanded] = useState(defaultExpand);

    const handleClick = () => {setIsExpanded(v=>!v)}


    return (
        <div className='rs-panel rs-panel-in rs-panel-collapsible rs-panel-bordered rs-panel-shaded mb-1'>
               <div type='button' tabIndex={0} role="button" styling="link" onKeyDown={handleClick} onClick={handleClick} className='rs-panel-header' style={{paddingBottom: '5px', paddingTop: '5px'}}>
                        <ArrowDownLine flip={isExpanded ? 'vertical' : null} className='rs-icon' style={{top: '10px'}}/>
                        <HoverShowAll text={header}>
                            <h5 style={{width: '90%'}} className='rs-panel-title ellip-overflow'>{header}</h5>
                        </HoverShowAll>
                        
                </div>
                    {isExpanded ?  
                        <div className='rs-anim-collapse rs-anim-in rs-panel-collapse' style={{height: 'auto'}}>
                            <div className='rs-panel-body'>
                                {children}
                            </div>
                        </div> 
                    : null}
        </div>
    );
};

export default CustomPanel;
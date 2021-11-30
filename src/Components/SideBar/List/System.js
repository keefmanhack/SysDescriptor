import React, { useRef, useState } from 'react';
import {Row, Col, Grid, Button, Whisper} from 'rsuite';
import MoreIcon from '@rsuite/icons/More';
import ArrowRightIcon from '@rsuite/icons/ArrowRight';
import ArrowDownIcon from '@rsuite/icons/ArrowDown';
import { SystemOptions } from './SystemOptions';
import HoverShowAll from '../../../misc/HoverShowAll';
import RevList from './RevList';

export const System = ({title='Untitled', revListID, partNumber, sysNumber, technician, owner, onRevSelected, onNewRevision, isSelected, revSelectedID}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const ref = useRef();
    title = title ==='' ? 'Untitled' : title;

    const selStyle= isSelected ? {borderLeft: '1px solid lightgreen'} : null

    return (
        <div className='rs-list rs-list-hover'>
            <button type='button' onClick={() => setIsExpanded(v => !v)} className='rs-list-item pointer p-2' style={{...selStyle, width: '100%'}}>
                <Grid fluid>
                    <Row>
                        <Col xs={2}>
                            <Button style={{fontSize: '18px'}} appearance='subtle' size='xs'>
                                {isExpanded ? <ArrowDownIcon/> : <ArrowRightIcon/>}
                            </Button>
                        </Col>
                        <Col xs={8}>
                            <HoverShowAll text={title}>
                                <h5 className='ellip-overflow'>{title}</h5>
                            </HoverShowAll>
                            <HoverShowAll text={partNumber}>
                                <span className='muted-c ellip-overflow'>{partNumber}</span>
                            </HoverShowAll>
                        </Col>
                        <Col xs={2}>
                            <HoverShowAll text="System Number">
                                <p className='muted-c ellip-overflow'>{sysNumber}</p>
                            </HoverShowAll>
                        </Col>
                        <Col xs={5}>
                            <HoverShowAll text={`Technician: ${technician}`}>
                                <p className='muted-c ellip-overflow'>{technician}</p>
                            </HoverShowAll>
                        </Col>
                        <Col xs={5}>
                            <HoverShowAll text={`Owner: ${owner}`}>
                                <p className='muted-c ellip-overflow'>{owner}</p>
                            </HoverShowAll>
                        </Col>
                        <Col xs={2}>
                            <Whisper
                                placement="rightStart"
                                controlId="control-id-with-dropdown"
                                trigger="click"
                                ref={ref}
                                onClick={(e)=>e.stopPropagation()}
                                speaker={<SystemOptions onNewRevision={()=>onNewRevision()}/>}                              
                            >
                                <Button appearance='subtle' size='xs'><MoreIcon/></Button>
                            </Whisper>
                        </Col>
                    </Row>
                </Grid>         
            </button>
            {isExpanded ? <RevList revSelectedID={revSelectedID} onRevSelected={(id)=>onRevSelected(id)} id={revListID}/> : null}           
        </div>
    )
}
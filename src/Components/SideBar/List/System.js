import React, { useRef, useState } from 'react';
import {Row, Col, Grid, Button, Whisper, Animation} from 'rsuite';
import MoreIcon from '@rsuite/icons/More';
import ArrowRightIcon from '@rsuite/icons/ArrowRight';
import ArrowDownIcon from '@rsuite/icons/ArrowDown';
import { Revision } from './Revision';
import { SystemOptions } from './SystemOptions';
import HoverShowAll from '../../../misc/HoverShowAll';

export const System = ({title='Untitled', sysNumber, technician='...', owner='...'}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const ref = useRef();

    title = title ==='' ? 'Untitled' : title;
    technician = technician ==='' ? '...' : technician;
    owner = owner ==='' ? '...' : owner;


    return (
        <div className='rs-list rs-list-hover'>
            <div className='rs-list-item pointer p-2'>
                <Grid fluid>
                    <Row>
                        <Col xs={2}>
                            <Button style={{fontSize: '18px'}} appearance='subtle' size='xs' onClick={() => setIsExpanded(v => !v)}>
                                {isExpanded ? <ArrowDownIcon/> : <ArrowRightIcon/>}
                            </Button>
                        </Col>
                        <Col xs={8}>
                            <HoverShowAll text={title}>
                                <h5 className='ellip-overflow'>{title}</h5>
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
                                speaker={<SystemOptions onNewRevision={()=>onNewRevision()}/>}                              
                            >
                                <Button appearance='subtle' size='xs'><MoreIcon/></Button>
                            </Whisper>
                        </Col>
                    </Row>
                </Grid>         
            </div>
            <Animation.Collapse in={isExpanded}>
                <div className='rs-list rs-list-hover v-scroll' style={{marginLeft: '10%'}}>
                    <Revision/>
                    <Revision/>
                    <Revision/>
                </div>
            </Animation.Collapse>
        </div>
    )
}
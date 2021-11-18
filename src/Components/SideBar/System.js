import React, { useRef, useState } from 'react';
import {Row, Col, Grid, Button, Whisper} from 'rsuite';
import MoreIcon from '@rsuite/icons/More';
import ArrowRightIcon from '@rsuite/icons/ArrowRight';
import ArrowDownIcon from '@rsuite/icons/ArrowDown';
import { Revision } from './Revision';
import { SystemOptions } from './SystemOptions';
// import { useHover } from '../../misc/customHooks';

export const System = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const ref = useRef();

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
                            <h5 className='ellip-overflow'>Untitled</h5>
                        </Col>
                        <Col xs={2}>
                            <p className='muted-c ellip-overflow'>1</p>
                        </Col>
                        <Col xs={5}>
                            <p className='muted-c ellip-overflow'>Technician</p>
                        </Col>
                        <Col xs={5}>
                            <p className='muted-c ellip-overflow'>Owner</p>
                        </Col>
                        <Col xs={2}>
                            <Whisper
                                placement="rightStart"
                                controlId="control-id-with-dropdown"
                                trigger="click"
                                ref={ref}
                                speaker={<SystemOptions/>}                              
                            >
                                <Button appearance='subtle' size='xs'><MoreIcon/></Button>
                            </Whisper>
                        </Col>
                    </Row>
                </Grid>         
            </div>
            {isExpanded ? 
                <div className='rs-list rs-list-hover' style={{marginLeft: '10%'}}>  
                    <Revision/>
                    <Revision/>
                    <Revision/>
                </div>
            : null}
        </div>
    )
}
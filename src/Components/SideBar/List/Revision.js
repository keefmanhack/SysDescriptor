import React from 'react'
import { Button, Col, Row, Grid } from 'rsuite';
import TrashIcon from '@rsuite/icons/Trash';
import moment from 'moment';

import { useHover } from '../../../misc/customHooks';
import HoverShowAll from '../../../misc/HoverShowAll';


export const Revision = ({onSelected, name, timestamp, isSelected}) => {
    const [ref, hover] = useHover();
    name=name || 'Untitled';

    const t = moment(timestamp);
    const isNew = moment().subtract(2, "days").isBefore(t);


    const selStyle = isSelected ? {borderLeft: '2px solid white'} : null;
    return (
        <button type='button' style={{display: 'block', width: '100%', ...selStyle}} onClick={()=>onSelected()} ref={ref} className='rs-list-item pointer p-1'>
            <Grid fluid>
                <Row>
                    <Col xs={5}>
                        <HoverShowAll text={name}>
                            <p className='bold ellip-overflow'>{name}</p>
                        </HoverShowAll>
                    </Col>
                    <Col xs={5}>
                        {isNew ? <span className='new'>New</span> : null}
                        
                    </Col>
                    <Col xs={5}>
                        <span className='muted-c'>Rev </span>1
                    </Col>
                    <Col xs={7}>
                        <span style={{fontSize: '12px'}}>
                            <p className='muted-c ellip-overflow'>{t.format("MMM Do YY")}</p>
                            <p className='muted-c mt-0 ellip-overflow'>{t.format("h:mm:ss a")}</p>
                        </span>
                    </Col>
                    <Col xs={2}>
                        <Button size='xs' appearance='subtle' color='red' style={{position: 'absolute', left: '1px', top: '4px', display: hover ? 'inline-block' : 'none' }}>
                            <TrashIcon/>
                        </Button>
                    </Col>
                </Row>
            </Grid>
        </button>
    )
}

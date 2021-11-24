import React from 'react'
import { Button, Col, Row, Grid } from 'rsuite';
import TrashIcon from '@rsuite/icons/Trash';
import { useHover } from '../../../misc/customHooks';

export const Revision = () => {
    const [ref, hover] = useHover();
    return (
        <div ref={ref} className='rs-list-item pointer p-1'>
            <Grid fluid>
                <Row>
                    <Col xs={5}>
                        Name
                    </Col>
                    <Col xs={5}>
                        <span className='new'>New</span>
                    </Col>
                    <Col xs={5}>
                        <span className='muted-c'>Rev </span>1
                    </Col>
                    <Col xs={7}>
                        TimeStamp
                    </Col>
                    <Col xs={2}>
                        <Button size='xs' appearance='subtle' color='red' style={{position: 'absolute', display: hover ? 'inline-block' : 'none' }}>
                            <TrashIcon/>
                        </Button>
                    </Col>
                </Row>
            </Grid>
        </div>
    )
}

import React from 'react';
import {Grid, Row, Col} from 'rsuite';

export const GridHeader = ({dataChildren, actionChildren}) => {
    return (
        <Grid fluid> 
            <Row>
                <Col xs={18}>
                    <div style={{textAlign: 'left', fontSize: '12px', marginTop: '3px'}} className='muted-c'>
                        {dataChildren}
                    </div>
                </Col>
                <Col xs={6}>
                    <div style={{textAlign: 'right'}}>
                        {actionChildren}
                    </div>
                </Col>
            </Row>
        </Grid>
    )
}

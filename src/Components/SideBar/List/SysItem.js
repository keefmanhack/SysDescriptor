import React from 'react';
import { Grid, List, Row, Col } from 'rsuite';

const styles = {
    cursor: 'pointer',
}


const SysItem = () => {
    console.log();
    return (
        <List.Item className='height-75' style={styles}>
            <Grid fluid>
                <Row>
                    <Col xs={10} md={8} lg={8}>
                        <h5>Name</h5>
                        <span style={{color: 'yellow'}}>New</span>
                    </Col>
                    <Col xs={5} md={6}>
                        <p className='muted-c'>Technician</p>
                        <p className='mt-1'>Techy</p>
                    </Col>
                    <Col xs={5} md={6}>
                        <p className='muted-c'>Owner</p>
                        <p className='mt-1'>Ownery</p>
                    </Col>
                    <Col xs={2} md={4} className='mt-3 muted-c'>
                        <p className='f-s ls-s'>10/20/21</p>
                        <p className='f-s ls-s'>10:51PM</p>
                    </Col>
                </Row>
            </Grid>
        </List.Item>
    );
};

export default SysItem;
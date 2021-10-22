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
                    <Col md={10}>
                        <h5>Name</h5>
                        <span style={{color: 'yellow'}}>New</span>
                    </Col>
                    <Col md={5}>
                        <p className='muted-c'>Technician</p>
                        <p className='mt-1'>Techy</p>
                    </Col>
                    <Col md={5}>
                        <p className='muted-c'>Owner</p>
                        <p className='mt-1'>Ownery</p>
                    </Col>
                    <Col md={2} className='mt-3 muted-c'>
                        <p className='f-s ls-s'>10/20/21</p>
                        <p className='f-s ls-s'>10:51PM</p>
                    </Col>
                </Row>
            </Grid>
        </List.Item>
    );
};

export default SysItem;
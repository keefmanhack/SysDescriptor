import React from 'react';
import { Grid, List, Row, Col } from 'rsuite';

const styles = {
    cursor: 'pointer',
}


const SysItem = ({name, tech, owner, timestamp, isNew}) => {
    console.log();
    return (
        <List.Item className='height-75' style={styles}>
            <Grid fluid>
                <Row>
                    <Col xs={10} md={8} lg={8}>
                        <h5>{name || "Untitled"}</h5>
                        {isNew ? <span style={{color: 'yellow'}}>New</span> : null}
                    </Col>
                    <Col xs={5} md={6}>
                        <p className='muted-c'>Technician</p>
                        <p className='mt-1'>{tech || "..."}</p>
                    </Col>
                    <Col xs={5} md={5}>
                        <p className='muted-c'>Owner</p>
                        <p className='mt-1'>{owner || "..."}</p>
                    </Col>
                    <Col xs={2} md={5} className='mt-3 muted-c'>
                        <p className='f-s ls-s mb-1'>{timestamp ? new Date(timestamp).toLocaleDateString() : "..."}</p>
                        <p className='f-s ls-s mt-2'>{timestamp ? new Date(timestamp).toLocaleTimeString() : "..."}</p>
                    </Col>
                </Row>
            </Grid>
        </List.Item>
    );
};

export default SysItem;
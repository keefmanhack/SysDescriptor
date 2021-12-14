import React from 'react';
import { Button, Grid, Row, Col } from 'rsuite';
import { ComponentDB } from '../../../../Database/SystemDB/RevisionDB/SubSystemDB/ComponentDB/ComponentDB';
import ActiveComp from './ActiveComp';

const ComponentStatus = ({subSysID, activeComps, possibleComps})  => {
    const dispActiveComps = () => {
        return  activeComps.map(v => {
            const {name, id} =v;
            return (
                <Col xs={1}>
                    <ActiveComp subSysID={subSysID} id={id} name={name}/>
                </Col>)
        })
    }

    const dispDisabledComps = () => {
        return possibleComps.map(name => {
            //  if component already exists in DB
            if(activeComps.find(ac => ac.name===name)){return null}

            return (
                <Col xs={1}><Button size='xs' className='mr-2' onClick={()=>ComponentDB.create(subSysID, name)}>
                    + {name}
                </Button></Col>)
        })
    }

    return (
        <div>
            <Grid fluid>
                <Row>
                    <h5 style={{fontSize: '14px'}}>Active</h5>
                    {dispActiveComps()}
                </Row>
                <Row>
                    <h5 style={{fontSize: '14px'}}>Disabled</h5>
                    {dispDisabledComps()}
                </Row>
            </Grid>
        </div>
    );
};

export default ComponentStatus;
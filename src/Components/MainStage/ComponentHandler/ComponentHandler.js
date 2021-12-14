import React from 'react';
import {Grid, Loader, Row, Col } from 'rsuite';
import { useComponents } from '../../../misc/customHooks';
import Comp from './Comp';
import ComponentStatus from './ComponentStatus/ComponentStatus';


const ComponentHandler = ({subSysID, subSysFormat}) => {
    const {comps, isUpdating} = useComponents(subSysID);

    if(isUpdating){return <Loader/>}

    return (
        <div style={{padding: '5px 15px'}}>
            <ComponentStatus activeComps={comps} subSysID={subSysID} possibleComps={Object.keys(subSysFormat)}/>
            <hr/>
            <Grid fluid>
                <Row>
                    {comps.map(v=> {
                        const {name, id} = v;
                        return (
                            <Col xs={24} md={12} lg={8}>
                                <Comp
                                    name={name}
                                    key={id}
                                    id={id}
                                />
                            </Col>
                        )
                    })}
                </Row>
            </Grid>

        </div>
    );
};

export default ComponentHandler;
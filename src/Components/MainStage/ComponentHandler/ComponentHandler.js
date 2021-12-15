import React from 'react';
import {Grid, Loader, Row, Col } from 'rsuite';
import { useComponents } from '../../../misc/customHooks';
import Comp from './Comp/Comp';
import ComponentStatus from './ComponentStatus/ComponentStatus';
import dataFormat from '../../../misc/dataFormat.json';

const ComponentHandler = ({subSysID, dataKey}) => {
    const {comps, isUpdating} = useComponents(subSysID);
    const possibleComps = dataFormat[dataKey];

    if(!possibleComps){return "Data is not specified for this subsystem"}

    if(isUpdating){return <Loader/>}

    return (
        <div style={{padding: '5px 15px'}}>
            <ComponentStatus activeComps={comps} subSysID={subSysID} possibleComps={Object.keys(possibleComps)}/>
            <hr/>
            <Grid fluid>
                <Row>
                    {comps.map(v=> {
                        const {name, id} = v;
                        return (
                            <Col xs={24} md={12} lg={8} key={id}>
                                <Comp
                                    name={name}
                                    key={id}
                                    id={id}
                                    format={possibleComps[name]}
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
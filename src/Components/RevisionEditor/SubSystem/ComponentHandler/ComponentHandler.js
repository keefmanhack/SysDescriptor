import React from 'react';
import {Grid, Loader, Row, Col } from 'rsuite';
import { useComponents } from '../../../../misc/customHooks';
import Comp from './Comp/Comp';
import ComponentStatus from './ComponentStatus/ComponentStatus';
import dataFormat from '../../../../misc/dataFormat.json';

const ComponentHandler = ({subSysID, dataKey}) => {
    const {comps, isUpdating} = useComponents(subSysID);
    const possibleComps = dataFormat[dataKey];

    if(!possibleComps){return "Data is not specified for this subsystem"}

    if(isUpdating){return <Loader/>}

    return (
        <div style={{padding: '5px 15px'}}>
            <ComponentStatus activeComps={comps} subSysID={subSysID} possibleComps={Object.keys(possibleComps)}/>
            <hr/>
            <div style={{height: '500px', overflowY: 'scroll'}}>
                <Grid fluid>
                    <Row>
                        {comps.map(v=> {
                            const {name, birthdate, id} = v;
                            return (
                                <Col xs={24} md={12} lg={8} key={id}>
                                    <Comp
                                        name={name}
                                        birthdate={birthdate}
                                        key={id}
                                        compID={id}
                                        format={possibleComps[name]}
                                        subSysID={subSysID}
                                    />
                                </Col>
                            )
                        })}
                    </Row>
                </Grid>
            </div>
        </div>
    );
};

export default ComponentHandler;
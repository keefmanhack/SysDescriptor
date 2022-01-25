import React from 'react';
import { Button, Grid, Row, Col } from 'rsuite';
import { useToolBar } from '../../../../../Contexts/toolbar.context';
import { ComponentDB } from '../../../../../Database/SystemDB/RevisionDB/SubSystemDB/ComponentDB/ComponentDB';
import Alert from '../../../../../misc/Alert';
import HoverShowAll from '../../../../misc/Helper Components/HoverShowAll';
import ActiveComp from './misc/ActiveComp';

const ComponentStatus = ({subSysID, activeComps, possibleComps})  => {
    const {setIsUpdating} = useToolBar();

    const handleCreate = async name => {
        setIsUpdating(true);
        try{
            await ComponentDB.create(subSysID, name);
            Alert.success(`New ${name} component created`);
        }catch(err){
            Alert.error(err);
        }
        setIsUpdating(false);
    }

    const dispActiveComps = () => {
        return  activeComps.map(v => {
            const {name, id} =v;
            return (
                <Col xs={12} md={8} lg={4} key={id}>
                    <ActiveComp style={{marginBottom: '5px'}} key={id} subSysID={subSysID} id={id} name={name}/>
                </Col>)
        })
    }

    const dispDisabledComps = () => {
        return possibleComps.map(name => {
            //  if component already exists in DB
            if(activeComps.find(ac => ac.name===name)){return null}

            return (
                <Col key={name} xs={12} md={8} lg={4}> 
                    <Button size='xs' className='mr-2 mb-1' style={{marginBottom: '5px'}} onClick={()=>handleCreate(name)}>
                    <HoverShowAll text={name}>
                        <span className='ellip-overflow'>
                            + {name} 
                        </span>
                    </HoverShowAll>
                    </Button>
                </Col>)
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
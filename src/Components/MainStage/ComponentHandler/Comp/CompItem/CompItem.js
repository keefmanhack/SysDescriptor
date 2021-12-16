import React from 'react';
import { Button, Col, Grid, Row } from 'rsuite';
import { useToolBar } from '../../../../../Contexts/toolbar.context';
import { ComponentItemDB } from '../../../../../Database/SystemDB/RevisionDB/SubSystemDB/ComponentDB/ComponentItemDB/ComponentItemDB';
import CustomPanel from '../../../../../misc/CustomPanel';
import SoftInput from './SoftInput';

const CompItem = ({i, format, compID}) => {
    const {setIsUpdating} = useToolBar();    
    const dispSoftwareData = () => {
        if(!format || !format.Software){return null}
        
        const dataTitles = Object.keys(format.Software);
        return dataTitles.map(title => {
            return (
                <Col xs={24} lg={12}>
                    <SoftInput title={title} key={title} compID={compID} inputType={format.Software[title].input}/>
                </Col>
            )
        })
    }

    const softInputs = dispSoftwareData();

    const handleDelete = async () => {
        setIsUpdating(true);
        await ComponentItemDB.delete(compID);
        setIsUpdating(false);
    }





    return (
        <CustomPanel defaultExpand header={i}>
            <Button color='red' appearance='subtle' size='xs' onClick={handleDelete}>Delete</Button>
                {softInputs ? <h5 className='mb-2' style={{fontSize: '16px', borderBottom: '1px solid', fontWeight: '400'}}>Software</h5> : null}
                <Grid fluid>
                    <Row>
                        {dispSoftwareData()}
                    </Row>
                </Grid>
                
        </CustomPanel>
    );
};

export default CompItem;
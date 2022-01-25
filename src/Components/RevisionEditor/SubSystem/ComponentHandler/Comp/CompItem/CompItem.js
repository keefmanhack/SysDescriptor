import React from 'react';
import {Col, Grid, Row } from 'rsuite';
import { useToolBar } from '../../../../../../Contexts/toolbar.context';
import { ComponentItemDB } from '../../../../../../Database/SystemDB/RevisionDB/SubSystemDB/ComponentDB/ComponentItemDB/ComponentItemDB';
import Alert from '../../../../../../misc/Alert';
import CustomPanel from '../../../../../misc/Custom Panel/CustomPanel';
import { GridHeader } from '../../../../../misc/Custom Panel/GridHeader';
import { dispTime } from '../../../../../../misc/helperfunc';
import { CompItemOptions } from './CompItemOptions';
import HardInput from './Local Inputs/HardInput';
import SoftInput from './Local Inputs/SoftInput';
import { useHardwareSerialNumber } from '../../../../../../misc/customHooks';

const CompItem = ({birthdate, format, itemID, parentID}) => {
    const {setIsUpdating} = useToolBar();    
    const dispSoftwareData = () => {
        if(!format || !format.Software){return null}
        
        const dataTitles = Object.keys(format.Software);
        return dataTitles.map((title, i) => {
            return (
                <Col key={i} md={24} lg={12}>
                    <SoftInput title={title} key={i} itemID={itemID} inputType={format.Software[title].input}/>
                </Col>
            )
        })
    }

    const dispHardwareData = () => {
        if(!format || !format.Hardware){return null}
        
        const dataTitles = Object.keys(format.Hardware);
        return dataTitles.map((title, i) => {
            return (
                <Col key={i} md={24} lg={12}>
                    <HardInput title={title} key={i} itemID={itemID} inputType={format.Hardware[title].input}/>
                </Col>
            )
        })
    }


    const softInputs = dispSoftwareData();
    const hardInputs = dispHardwareData();


    const handleDelete = async () => {
        try{
            setIsUpdating(true);
            await ComponentItemDB.deleteSpecific(parentID, itemID);
            Alert.success(`Successfully deleted component item`)
        }catch(err){
            Alert.error(err);
        }
        setIsUpdating(false);
    }

    const snObj = useHardwareSerialNumber(itemID);

    return (
        <CustomPanel defaultExpand={false} header={`SN: ${snObj ? snObj.value : 'not set'}`}>
            <GridHeader
                dataChildren={<span>{dispTime(birthdate)}</span>}
                actionChildren={
                    <CompItemOptions onDelete={handleDelete}/>
                }
            />
            
                <Grid fluid>
                    <Row>
                        {softInputs ? <h5 className='mb-2' style={{fontSize: '14px', borderBottom: '1px solid', fontWeight: '400'}}>Software</h5> : null}
                        {softInputs}
                    </Row>
                    <Row>
                        {hardInputs ? <h5 className='mb-2 mt-2' style={{fontSize: '14px', borderBottom: '1px solid', fontWeight: '400'}}>Hardware</h5> : null}
                        {hardInputs}
                    </Row>
                </Grid>
                
        </CustomPanel>
    );
};

export default CompItem;
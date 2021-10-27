import React from 'react';
import { Grid, Row, Col, Button, Input } from 'rsuite'
import SysGroup from './SysGroup';
import SysDataContext from '../../Contexts/sysdata.context';
import dataFormat from '../../misc/dataFormat.json';


const styles = {
    backgroundColor: 'rgb(40 40 40 / 1)',
    height: '100vh'
}

const MainStage = () => {
    const sysData = JSON.parse(JSON.stringify(dataFormat));
    const updateSysData = (path, val) => {
        path.value = val;
    }

   return (
       <SysDataContext.Provider value={{sysData, updateSysData}}>
        <div style={styles}>
            <div className='p-1 w-100'>
                    <Button color='blue' appearance="primary" className='mr-3'>Generate File</Button>
                    <Button color='red' appearance="subtle" className=''>Reset</Button>
            </div>
            <div style={{width: '40%'}} className='mx-auto mb-3'>
                <label htmlFor='sys-name'>System Name</label>
                <Input onChange={(e) => {updateSysData(sysData.general.name, e)}} id='sys-name'style={{ fontSize: '32px'}} placeholder='LDL, HST, etc...'/>
            </div>
            <Grid fluid>
                    <Row>
                        <Col xs={12}>
                        <div style={{width: '50%'}} className='mx-auto mb-3'>
                            <label htmlFor='tech'>Technician</label>
                            <Input onChange={(e) => {updateSysData(sysData.general.technician, e)}} id='tech' className='mx-auto' style={{ fontSize: '24px'}} placeholder='John Smith'/>
                        </div>  
                        </Col>
                        <Col xs={12}>
                            <div style={{width: '50%'}} className='mx-auto mb-3'>
                                <label htmlFor='own'>Owner</label>
                                <Input onChange={(e) => {updateSysData(sysData.general.owner, e)}} id='own' className='mx-auto' style={{ fontSize: '24px'}} placeholder='John Smith'/>
                            </div> 
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={8}>
                            <SysGroup data={dataFormat.system} onGroupUpdated={(e, path) => updateSysData(e, path + ',system')} title='System'/>
                        </Col>
                        <Col xs={8}>
                            <SysGroup data={dataFormat.atc} onGroupUpdated={(e, path) => updateSysData(e, path + ',atc')} title='ATC'/>
                        </Col>
                        <Col xs={8}>
                            <SysGroup data={dataFormat.acses} onGroupUpdated={(e, path) => updateSysData(e, path + ',acses')} title='ACSES'/>
                        </Col>
                    </Row>
                </Grid>
        </div>
       </SysDataContext.Provider>

    )

}
export default MainStage;
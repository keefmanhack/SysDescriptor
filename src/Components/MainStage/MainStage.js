import React, {useState } from 'react';
import { Grid, Row, Col, Button, Input } from 'rsuite'
import SysGroup from './SysGroup';
import sysFormat from '../../misc/dataFormat.json';


const styles = {
    backgroundColor: 'rgb(40 40 40 / 1)',
    height: '100vh'
}

const MainStage = () => {
    //  const [data, setData] = useState(sysFormat);
    const [gen, setGen] = useState(sysFormat.general);

    console.log(gen);

   return (
       <div style={styles}>
           <div className='p-1 w-100'>
                <Button color='blue' appearance="primary" className='mr-3'>Generate File</Button>
                <Button color='red' appearance="primary" className=''>Reset</Button>
           </div>
            <div style={{width: '40%'}} className='mx-auto mb-3'>
                <label htmlFor='sys-name'>System Name</label>
                <Input onChange={(e) => setGen((val) => {val.name.value = e; return val;})} id='sys-name'style={{ fontSize: '32px'}} placeholder='LDL, HST, etc...'/>
            </div>
           <Grid fluid>
                <Row>
                    <Col xs={12}>
                    <div style={{width: '50%'}} className='mx-auto mb-3'>
                        <label htmlFor='tech'>Technician</label>
                         <Input id='tech' className='mx-auto' style={{ fontSize: '24px'}} placeholder='John Smith'/>
                    </div>  
                    </Col>
                    <Col xs={12}>
                        <div style={{width: '50%'}} className='mx-auto mb-3'>
                            <label htmlFor='own'>Owner</label>
                            <Input id='own' className='mx-auto' style={{ fontSize: '24px'}} placeholder='John Smith'/>
                        </div> 
                    </Col>
                </Row>
                <Row>
                    <Col xs={8}>
                        <SysGroup title='System'/>
                    </Col>
                    <Col xs={8}>
                        <SysGroup title='ATC'/>
                    </Col>
                    <Col xs={8}>
                        <SysGroup title='ACSES'/>
                    </Col>
                </Row>
            </Grid>
       </div>

    )

}
export default MainStage;
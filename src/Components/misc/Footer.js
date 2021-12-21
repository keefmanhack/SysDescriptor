import React from 'react';

const Footer = ({style}) => (
        <div style={{...style, padding: '10px 30px', position: 'fixed', bottom: 0, right: 0}}>
            <p style={{textAlign: 'right'}}>Created by EDP <a href='https://www.linkedin.com/in/keefergregoire/'>Keefer Gregoire</a></p>
        </div>
    );


export default Footer;
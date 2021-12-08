import React, { useEffect, useState } from 'react';
import { Nav } from 'rsuite';

const SubSystemNav = ({subSystems=[]}) => {
    const [selectedSubSys, setSelectedSubSys] = useState();

    useEffect(() => {
        if(!selectedSubSys && subSystems[0]){
            setSelectedSubSys(subSystems[0].id);
        }
    }, [subSystems])

    const createSubSystemNavs = () => (
        subSystems.map((subSys) => {
            const {name, id} = subSys;
            return (
                <Nav.Item onClick={()=>setSelectedSubSys(id)} key={id} active={id===selectedSubSys}>{name}</Nav.Item>
            )
        })
    )

    return (
        <div>
            <Nav appearance="tabs">
                {createSubSystemNavs()}
            </Nav>
        </div>
    );
};

export default SubSystemNav;
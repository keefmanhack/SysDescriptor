import React from 'react';
import { Button, Panel } from 'rsuite';

const Comp = ({name, id}) => {
    return (
        <Panel bordered collapsible shaded expanded>
            {name}
            <Button size='xs' color='green' appearance='primary'>Add</Button>
            <Panel header={1} collapsible shaded>
            {id}
            </Panel>
            
        </Panel>
    );
};

export default Comp;
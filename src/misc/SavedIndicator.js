import { CheckRound, DoingRound } from '@rsuite/icons';
import React, { useEffect, useState } from 'react';

let to;
const SavedIndicator = ({isUpdating, persistFor=1000}) => {
    const [delayedIsUpdating, setDelayedIsUpdating] = useState(false);    
    useEffect(() => {
        clearTimeout(to);
        if(!isUpdating){
            setDelayedIsUpdating(true);
            to = setTimeout(() => {
                setDelayedIsUpdating(false);
            }, persistFor);
        }
    }, [isUpdating])



    return (
        <>
        {delayedIsUpdating ? <DoingRound pulse/> : <CheckRound color='green'/>}
        </>
    );
};

export default SavedIndicator;
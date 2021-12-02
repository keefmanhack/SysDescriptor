import React, { useEffect, useState } from 'react';
import { Tag } from 'rsuite';

let to;
const SavedIndicator = ({style, isUpdating, persistFor=1000}) => {
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
        <Tag style={{...style, transition: '.3s', textAlign: 'left'}}  color={delayedIsUpdating ? "green" : ""} appearance={delayedIsUpdating ? "primary" : "ghost"} >
            {delayedIsUpdating ? "Saving..." : "Saved"}
        </Tag>
    );
};

export default SavedIndicator;
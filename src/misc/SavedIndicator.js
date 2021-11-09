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
        <Tag style={style}  color={delayedIsUpdating ? "green" : "blue"}>
            {delayedIsUpdating ? "Saving..." : "Saved"}
        </Tag>
    );
};

export default SavedIndicator;
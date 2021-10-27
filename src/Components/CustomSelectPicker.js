import React from 'react';
import { SelectPicker } from 'rsuite';

const CustomSelectPicker = ({ placement, data, placeholder, onSelect }) => (
    <SelectPicker onSelect={onSelect} data={data} placement={placement} placeholder={placeholder} />
  );

export default CustomSelectPicker


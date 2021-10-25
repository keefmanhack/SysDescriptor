import React from 'react';
import { SelectPicker } from 'rsuite';

const CustomSelectPicker = ({ placement, data, placeholder }) => (
    <SelectPicker data={data} placement={placement} placeholder={placeholder} />
  );

export default CustomSelectPicker


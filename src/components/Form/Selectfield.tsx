/* eslint-disable @typescript-eslint/no-explicit-any */
import { Select } from 'antd';
import { Controller } from 'react-hook-form';

interface SelectfieldProps {
  label: string;
  name: string;
  options: { value: string; label: string }[];
  disabled: boolean;
  control?: any;
  value: string;
  onChange: (value: any) => void;
  width?: string | number; // Added optional width prop
}

const { Option } = Select;

const Selectfield = ({ label, name, control, options, value, onChange, disabled, width }: SelectfieldProps) => {
  return (
    <div>
      <label>{label}</label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            value={value}
            onChange={(e) => {
              field.onChange(e); 
              onChange(e); 
            }}
            disabled={disabled}
            style={{ width: width || '40%' }} // Use the width prop if provided, otherwise default to 100%
          >
            {options.map((option) => (
              <Option key={option.value} value={option.value}>
                {option.label}
              </Option>
            ))}
          </Select>
        )}
      />
    </div>
  );
};

export default Selectfield;

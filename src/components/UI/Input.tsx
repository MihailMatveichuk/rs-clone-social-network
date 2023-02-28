import React from 'react';
type InputProps = {
  errorText: string;
  value: string;
  placeholder: string;
  onChange: (val: string) => void;
};

const CustomInput: React.FC<InputProps> = ({
  value,
  placeholder,
  onChange,
}) => {
  return (
    <div className="input-container">
      <input
        type="text"
        value={value}
        required
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default CustomInput;

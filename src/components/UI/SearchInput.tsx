import React, { useState } from 'react';

type SearchInputProps = {
  placeholder: string;
  value: string;
  onChange: (val: string) => void;
};

const SearchInput: React.FC<SearchInputProps> = ({
  onChange,
  value = '',
  placeholder,
}) => {


  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    if (target instanceof HTMLInputElement) {
      onChange(target.value);
    }
  };

  return (
    <div className="search-input">
      <input
        type="text"
        onChange={onInputChange}
        placeholder={placeholder}
        value={value}
      />
    </div>
  );
};

export default SearchInput;

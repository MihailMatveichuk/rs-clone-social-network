import React, { useState } from 'react';

type SearchInputProps = {
  placeholder: string;
  onEnterClick: (val: string) => void;
};

const SearchInput: React.FC<SearchInputProps> = ({
  onEnterClick,
  placeholder,
}) => {
  const [userName, setUserName] = useState('');

  const handleKey = async (e: {
    code: string;
    target: unknown;
    preventDefault: () => void;
  }) => {
    e.code === 'Enter' && onEnterClick(userName);
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    if (target instanceof HTMLInputElement) {
      setUserName(target.value);
    }
  };

  return (
    <div className="search-input">
      <input
        type="text"
        onChange={onInputChange}
        placeholder={placeholder}
        onKeyDown={handleKey}
      />
    </div>
  );
};

export default SearchInput;

import React, { useContext, useState } from 'react';
// import { AuthContext } from '../../context/AuthContext';
// import {
//   collection,
//   query,
//   where,
//   getDocs,
//   setDoc,
//   updateDoc,
//   doc,
//   serverTimestamp,
//   getDoc,
//   DocumentData,
// } from 'firebase/firestore';
// import { db } from '../../firebase';
// import { User } from 'firebase/auth';

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
      {/* {err && <span>User not found</span>} */}
      {/* {user && (
        <button className="userChat" onClick={handleSelect}>
          <img className="userChatImg" src={user.photoURL || ''} alt="" />
          <div className="userChatInfo">
            <span className="user-name">{user?.displayName}</span>
          </div>
        </button>
      )} */}
    </div>
  );
};

export default SearchInput;

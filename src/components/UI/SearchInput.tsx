import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  updateDoc,
  doc,
  serverTimestamp,
  getDoc,
  DocumentData,
} from 'firebase/firestore';
import { db } from '../../firebase';
import { User } from 'firebase/auth';

type SearchInputProps = {
  placeholder: string;
  onChange: (val: string) => void;
};

const SearchInput: React.FC<SearchInputProps> = ({ onChange, placeholder }) => {
  const [, setValue] = useState<string>('');
  const { currentUser } = useContext(AuthContext);
  const [userName, setUserName] = useState('');
  const [user, setUser] = useState<User | null | undefined | DocumentData>(
    null
  );

  const [err, setError] = useState(false);

  const handleSearch = async () => {
    const q = query(
      collection(db, 'users'),
      where('displayName', '==', userName)
    );
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
        console.log('doc.data()', doc.data());
      });
    } catch (err) {
      setError(true);
    }
  };

  const handleKey = async (e: {
    code: string;
    target: unknown;
    preventDefault: () => void;
  }) => {
    e.code === 'Enter' && handleSearch();
  };

  const handleSelect = async () => {
    const combinedId =
      currentUser!.uid > user?.uid
        ? currentUser?.uid + user?.uid
        : user?.uid + currentUser?.uid;
    try {
      const res = await getDoc(doc(db, 'chats', combinedId));
      if (!res.exists()) {
        await setDoc(doc(db, 'chats', combinedId), { messages: [] });
        await updateDoc(doc(db, 'userChats', currentUser!.uid), {
          [combinedId + '.userInfo']: {
            uid: user?.uid,
            displayName: user?.displayName,
            photoURL: user?.photoURL,
          },
          [combinedId + '.date']: serverTimestamp(),
        });
        await updateDoc(doc(db, 'userChats', user?.uid), {
          [combinedId + '.userInfo']: {
            uid: currentUser?.uid,
            displayName: currentUser?.displayName,
            photoURL: currentUser?.photoURL,
          },
          [combinedId + '.date']: serverTimestamp(),
        });
      }
    } catch (err) {}

    setUser(null);
    setUserName('');
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    if (target instanceof HTMLInputElement) {
      setValue(target.value);
      onChange(target.value);
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
      {err && <span>User not found</span>}
      {user && (
        <button className="userChat" onClick={handleSelect}>
          <img className="userChatImg" src={user.photoURL || ''} alt="" />
          <div className="userChatInfo">
            <span className="user-name">{user?.displayName}</span>
          </div>
        </button>
      )}
    </div>
  );
};

export default SearchInput;

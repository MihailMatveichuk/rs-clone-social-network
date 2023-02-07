import React, { useContext, useState } from 'react';
// const Avatar = require('./assets/images/Avatar1.png');
import '../App.css';
import { AuthContext } from '../context/AuthContext';
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
} from 'firebase/firestore';
import { db } from '../firebase';

const Searchbar = () => {
  const { currentUser } = useContext(AuthContext);
  const [userName, setUserName] = useState('');
  const [user, setUser] = useState({});
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
        console.log(doc.data());
      });
    } catch (err) {
      setError(true);
    }
  };

  const handleKey = async (e: {
    code: string;
    target: any;
    preventDefault: () => void;
  }) => {
    e.code === 'Enter' && handleSearch();
  };

  const handleSelect = async () => {
    const combinedId =
      currentUser!.uid > user.uid
        ? currentUser?.uid + user.uid
        : user.uid + currentUser?.uid;
    try {
      const res = await getDoc(doc(db, 'chats', combinedId));
      if (!res.exists()) {
        await setDoc(doc(db, 'chats', combinedId), { messages: [] });
        await updateDoc(doc(db, 'userChats', currentUser!.uid), {
          [combinedId + '.userInfo']: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + '.date']: serverTimestamp(),
        });
        await updateDoc(doc(db, 'userChats', user.uid), {
          [combinedId + '.userInfo']: {
            uid: currentUser!.uid,
            displayName: currentUser!.displayName,
            photoURL: currentUser!.photoURL,
          },
          [combinedId + '.date']: serverTimestamp(),
        });
      }
    } catch (err) {}

    setUser(null);
    setUserName('');
  };

  return (
    <div className="search-bar">
      <input
        className="search"
        type="text"
        placeholder="Chats, messages and more"
        onKeyDown={handleKey}
        onChange={(e) => setUserName(e.target.value)}
        value={userName}
      />
      {err && <span>User not found</span>}
      {user && (
        <div className="userChat" onClick={handleSelect}>
          <img
            className="userChatImg"
            src={user?.photoURL || ''}
            alt="photoURL"
          />
          <div className="userChatInfo">
            <span className="user-name">{user?.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Searchbar;

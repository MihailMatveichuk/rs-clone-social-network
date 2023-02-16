import { User } from 'firebase/auth';
import { useContext, useEffect, useState } from 'react';
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
  onSnapshot,
  getDoc,
  DocumentData,
} from 'firebase/firestore';
import Chats from './Chats';
import SearchInput from './UI/SearchInput';
import { db } from '../firebase';
import { ActionType, authUser } from '../types';
import { ChatContext } from '../context/Chatcontext';
import { createChat, getChat } from '../api';

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  const [userName, setUserName] = useState('');
  const [chats, setChats] = useState<DocumentData | undefined>([])
  const [users, setUsers] = useState<DocumentData | undefined>([])
  const [user, setUser] = useState<User | null | undefined | DocumentData>(
    null
  );
  const [err, setError] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);

  const gtChats = () => {
    setLoading(true)
    const unsub = onSnapshot(
      doc(db, 'chats', currentUser!.uid),
      (doc) => {
        if (doc && doc.data()) {
          const data = doc.data()
          console.log(data);
          
          if (data) {
            setChats(data.chats);
          }
          setLoading(false)
        }
      }
    );
    return () => {
      unsub();
    };
  };

  useEffect(() => {
    currentUser?.uid && gtChats();
  }, [currentUser?.uid]);


  const handleSelect = async (user: authUser) => {
    console.log(user)
    const chat = await getChat(currentUser!.uid,user.uid )
    console.log(chat)
    if (!chat) {
      await createChat(currentUser!.uid,user.uid)
    }
    // const combinedId =
    //   currentUser!.uid > user?.uid
    //     ? currentUser?.uid + user?.uid
    //     : user?.uid + currentUser?.uid;
    // try {
    //   const res = await getDoc(doc(db, 'chats', combinedId));
    //   if (!res.exists()) {
    //     await setDoc(doc(db, 'chats', combinedId), { messages: [] });
    //     await updateDoc(doc(db, 'userChats', currentUser!.uid), {
    //       [combinedId + '.userInfo']: {
    //         uid: user?.uid,
    //         displayName: user?.displayName,
    //         photoURL: user?.photoURL,
    //       },
    //       [combinedId + '.date']: serverTimestamp(),
    //     });
    //     await updateDoc(doc(db, 'userChats', user?.uid), {
    //       [combinedId + '.userInfo']: {
    //         uid: currentUser?.uid,
    //         displayName: currentUser?.displayName,
    //         photoURL: currentUser?.photoURL,
    //       },
    //       [combinedId + '.date']: serverTimestamp(),
    //     });
    //   }
    // } catch (err) {}
    // dispatch({ type: ActionType.ChangeUser, payload: user });
  };
  const onEnterHandler = async (val: string) => {
    console.log(val)
      const q = query(
        collection(db, 'users'),
        where('displayName', '==', val)
      );    
      try {
        const querySnapshot = await getDocs(q);
        console.log(querySnapshot);
        
        const arr:DocumentData = []
        querySnapshot.forEach((doc) => {
          console.log(doc.data);
          
         arr.push(doc.data());
        });
        setUsers(arr)
      } catch (err) {
        setError(true);
      }
  }
  return (
    <div className="aside">
      <div className="container">
        <div className="aside__top">
          <h3>Chats</h3>
          <div className="navbar_top_right">
            <svg
              width="33"
              height="33"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_17952_54146)">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M23.9993 12C19.5809 12 15.9993 15.5826 15.9993 20.0007V22.8268L14.6193 26.6907C14.4693 27.1107 14.3383 27.4776 14.2542 27.7841C14.1673 28.1012 14.099 28.458 14.1507 28.8375C14.2605 29.6431 14.7551 30.345 15.4768 30.7193C15.8168 30.8956 16.1758 30.9514 16.5036 30.9761C16.8206 31 17.2102 31 17.6562 31L19.9993 31C19.9993 33.2091 21.7902 35 23.9993 35C26.2085 35 27.9993 33.2091 27.9993 31L30.3424 31C30.7884 31 31.178 31 31.495 30.9761C31.8228 30.9514 32.1818 30.8956 32.5218 30.7193C33.2435 30.345 33.7382 29.6431 33.8479 28.8375C33.8996 28.458 33.8314 28.1012 33.7444 27.7841C33.6604 27.4776 33.5293 27.1107 33.3793 26.6906L31.9993 22.8268V20.0007C31.9993 15.5826 28.4177 12 23.9993 12ZM25.9993 31H21.9993C21.9993 32.1046 22.8947 33 23.9993 33C25.1039 33 25.9993 32.1046 25.9993 31ZM30.3066 29C30.799 29 31.112 28.9993 31.3445 28.9818C31.5334 28.9675 31.5953 28.9458 31.603 28.9428C31.7463 28.8677 31.8444 28.7279 31.8662 28.5675C31.8639 28.5845 31.8767 28.5357 31.8157 28.3131C31.754 28.0883 31.6493 27.7933 31.4837 27.3296L30.0655 23.3584C30.0245 23.2438 29.9993 23.1159 29.9993 22.9776V20.0007C29.9993 16.6869 27.3129 14 23.9993 14C20.6858 14 17.9993 16.6869 17.9993 20.0007V22.9776C17.9993 23.1159 17.9741 23.2438 17.9332 23.3584L16.5149 27.3296C16.3493 27.7933 16.2446 28.0883 16.183 28.3131C16.1329 28.4959 16.1325 28.5615 16.1327 28.5697C16.1552 28.7292 16.253 28.8681 16.3957 28.9428C16.4033 28.9458 16.4652 28.9675 16.6542 28.9818C16.8866 28.9993 17.1997 29 17.6921 29H30.3066Z"
                  fill="#71747A"
                />
              </g>
              <defs>
                <clipPath id="clip0_17952_54146">
                  <rect
                    width="24"
                    height="24"
                    fill="white"
                    transform="translate(12 12)"
                  />
                </clipPath>
              </defs>
            </svg>
            <svg
              width="16"
              height="16"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10 0.25C10.5523 0.25 11 0.697715 11 1.25V9H18.75C19.3023 9 19.75 9.44771 19.75 10C19.75 10.5523 19.3023 11 18.75 11H11V18.75C11 19.3023 10.5523 19.75 10 19.75C9.44771 19.75 9 19.3023 9 18.75V11H1.25C0.697715 11 0.25 10.5523 0.25 10C0.25 9.44771 0.697715 9 1.25 9H9V1.25C9 0.697715 9.44771 0.25 10 0.25Z"
                fill="#71747A"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className="container">
        <SearchInput
          onEnterClick={onEnterHandler}
          placeholder="Chats, messages and more"
        />
      </div>
      <Chats
        chats={chats}
        loading={loading}
        users={users}
        onUserSelect={handleSelect}
      />
    </div>
  );
};

export default Navbar;





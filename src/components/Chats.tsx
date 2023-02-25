import { Key, useContext } from 'react';
// import { db, storage } from '../firebase';
// import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/Chatcontext';
import { ActionType, authUser } from '../types';
import { ColorRing } from 'react-loader-spinner';
import {
  // collection,
  // query,
  // where,
  // getDocs,
  // setDoc,
  // updateDoc,
  // doc,
  // serverTimestamp,
  // onSnapshot,
  // getDoc,
  DocumentData,
} from 'firebase/firestore';
// import { User } from 'firebase/auth';
import Loading from './UI/Loading';
// import { getDownloadURL, ref } from 'firebase/storage';
import ChatCard from './UI/ChatCard';
import { useSearchParams } from 'react-router-dom';

<ColorRing
  visible={true}
  height="50"
  width="50"
  ariaLabel="blocks-loading"
  wrapperStyle={{}}
  wrapperClass="blocks-wrapper"
  colors={['#b8c480', '#B2A3B5', '#F4442E', '#51E5FF', '#429EA6']}
/>;

type ChatsProps = {
  chats: DocumentData | undefined;
  users: DocumentData | undefined;
  loading: boolean;
  onUserSelect: (user: authUser) => void;
};

const Chats: React.FC<ChatsProps> = ({
  chats,
  users,
  loading,
  onUserSelect,
}) => {
  const { dispatch } = useContext(ChatContext);
  let [params, setParams] = useSearchParams();

  const handleSelect = (u: any) => {
    dispatch({ type: ActionType.ChangeUser, payload: u });
    setParams({
      chat:  u.user
    })
  };

  return (
    <div className="chats">
      {loading && <Loading />}
      <ul className="chats__list">
        {users != undefined &&
          users.map((user: authUser) => (
            <li
              className="user-chat"
              key={user.uid}
              onClick={() => onUserSelect(user)}
              role="presentation"
            >
              <div className="container">
                <div className="user-chat__inner">
                  {user.photoURL && (
                    <img
                      className="user-chat__img"
                      src={user.photoURL}
                      alt="hi"
                    />
                  )}
                  <div className="user-chat__message">
                    <span>{user.displayName}</span>
                    <div></div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        {chats != undefined && 
          chats
            ?.sort(
              (a: { date: number }, b: { date: number }) => b.date - a.date
            )
            .map((chat: DocumentData, i: Key | null | undefined) => (
              <ChatCard handleSelect={handleSelect} chat={chat} key={i} />
            ))
        }
      </ul>
    </div>
  );
};

export default Chats;

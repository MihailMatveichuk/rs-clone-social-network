import { useContext, useEffect, useState } from 'react';
import { db, storage } from '../firebase';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/Chatcontext';
import { ActionType, authUser } from '../types';
import { ColorRing } from 'react-loader-spinner';
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
import { User } from 'firebase/auth';
import Loading from './UI/Loading';
import { getDownloadURL, ref } from 'firebase/storage';
import ChatCard from './UI/ChatCard';

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

  const handleSelect = (u: any) => {
    dispatch({ type: ActionType.ChangeUser, payload: u });
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
                      alt=""
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
        {chats != undefined ? (
          chats?.sort((a, b) => b.date - a.date)
            .map((chat) => (
              <ChatCard
                handleSelect={handleSelect}
                chat={chat}
              />
            ))
        ) : (
          <div className="user-chat">
            <div className="container">
              <h1>Search your contacts | </h1>
            </div>
          </div>
        )}
      </ul>
    </div>

    /*    <>
      {chats?.length == 0 ? (
        <ColorRing />
      ) : (
        <div className="chats">
          {Object.entries(chats!)
            ?.sort((a, b) => b[1].date - a[1].date)
            .map((chat) => (
              <div
                className="userChat"
                key={chat[0]}
                onClick={() => handleSelect(chat[1].userInfo)}
                role="presentation"
              >
                <img
                  className="userChatImg"
                  src={chat[1].userInfo.photoURL}
                  alt=""
                />
                <div className="userChatInfo">
                  <span>{chat[1].userInfo.displayName}</span>
                  <p>{chat[1].lastMessage?.text}</p>
                </div>
              </div>
            ))}
        </div>
      )}
    </>
*/
  );
};

export default Chats;

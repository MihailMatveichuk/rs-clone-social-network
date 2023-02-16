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
  console.log(chats, loading);

  const handleSelect = (u: any) => {
    console.log(u)
    //dispatch({ type: ActionType.ChangeUser, payload: u });
  };

getDownloadURL(ref(storage, 'images/product_595.jpg'))
  .then((url) => {
    // `url` is the download URL for 'images/stars.jpg'

    // This can be downloaded directly:
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = (event) => {
      const blob = xhr.response;
    };
    xhr.open('GET', url);
    xhr.send();

    // Or inserted into an <img> element
    console.log(url);
    
    // const img = document.getElementById('myimg');
    // img.setAttribute('src', url);
  })
  .catch((error) => {
    console.log(error);
    
    // Handle any errors
  });

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
          Object.entries(chats!)
            ?.sort((a, b) => b[1].date - a[1].date)
            .map((chat) => (
              <li
                className="user-chat"
                key={chat[0]}
                onClick={() => handleSelect(chat[1].userInfo)}
                role="presentation"
              >
                <div className="container">
                  <div className="user-chat__inner">
                  
                      <img
                        className="user-chat__img"
                        src={chat[1].memberPhoto}
                        alt=""
                      />
                    
                    <div className="user-chat__message">
                      
                        <span>{chat[1].memberName}</span>
                      
                      <div>{chat[1].lastMessage}</div>
                    </div>
                  </div>
                </div>
              </li>
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

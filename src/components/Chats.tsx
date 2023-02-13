import { useContext, useEffect, useState } from 'react';
import { doc, DocumentData, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/Chatcontext';
import { ActionType } from '../types';

const Chats = () => {
  const [chats, setChats] = useState<DocumentData | undefined>([]);
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(
        doc(db, 'userChats', currentUser!.uid),
        (doc) => {
          setChats(doc.data());
        }
      );

      return () => {
        unsub();
      };
    };
    currentUser?.uid && getChats();
  }, [currentUser?.uid]);

  const handleSelect = (u: any) => {
    dispatch({ type: ActionType.ChangeUser, payload: u });
  };
  return (
    <div className="chats">
      <ul className="chats__list">
      {Object.entries(chats!)
        ?.sort((a, b) => b[1].date - a[1].date)
        .map((chat) => (
          <div
            className="user-chat"
            key={chat[0]}
            onClick={() => handleSelect(chat[1].userInfo)}
            role="presentation"
          >
            <div className="container">
              <div className="user-chat__inner">
                <img
                    className="user-chat__img"
                    src={chat[1].userInfo.photoURL}
                    alt=""
                />
                <div className="user-chat__message">
                  <span>{chat[1].userInfo.displayName}</span>
                  <div>{chat[1].lastMessage?.text}</div>
                </div>
              </div>
            </div>

          </div>
        ))}
      </ul>
    </div>
  );
};

export default Chats;

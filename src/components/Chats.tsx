import { useContext, useEffect, useState } from 'react';
import { doc, DocumentData, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/Chatcontext';
import { ActionType } from '../types';
import { ColorRing } from 'react-loader-spinner';
<ColorRing
  visible={true}
  height="50"
  width="50"
  ariaLabel="blocks-loading"
  wrapperStyle={{}}
  wrapperClass="blocks-wrapper"
  colors={['#b8c480', '#B2A3B5', '#F4442E', '#51E5FF', '#429EA6']}
/>;
const Chats = () => {
  const [chats, setChats] = useState<DocumentData | undefined>([]);
  console.log('chats: ', chats);
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

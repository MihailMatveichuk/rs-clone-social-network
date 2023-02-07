// const Tesla = require('./assets/images/Tesla.png');
// const Add = require('./assets/images/Add.png');
// const Call = require('./assets/images/Call.png');
// const Menu = require('./assets/images/Menu.png');
// import Messages from './Messages';
// import InputPanel from './InputPanel';
import { useContext, useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/Chatcontext';

const Chats = () => {
  const [chats, setChats] = useState([]);

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, 'userChats', currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };
    currentUser.uid && getChats();
  }, [currentUser.uid]);
  console.log('chats___________', Object.entries(chats));

  const handleSelect = (u) => {
    dispatch({ type: 'CHANGE_USER', payload: u });
  };
  return (
    <div className="chats">
      {Object.entries(chats)
        ?.sort((a, b) => b[1].date - a[1].date)
        .map((chat) => (
          <div
            className="userChat"
            key={chat[0]}
            onClick={() => handleSelect(chat[1].userInfo)}
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
  );

  // <div className="chats">
  {
    /* <div className="chatInfo">
        <div className="chatDescription">
          <img src={Tesla} alt="" />
          <div className="chatText">
            <span className="name-chat">Tesla Board</span>
            <span className="amount-members">12 members</span>
          </div>
        </div>
        <div className="chatIcons">
          <img src={Add} alt="" />
          <img src={Call} alt="" />
          <img src={Menu} alt="" />
        </div>
      </div>
      <Messages />
      <InputPanel /> */
  }
};

export default Chats;

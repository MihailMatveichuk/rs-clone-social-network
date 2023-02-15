import { useContext } from 'react';
import '../App.css';
import { ChatContext } from '../context/Chatcontext';
import { auth } from '../firebase';
import InputPanel from './InputPanel';
import Messages from './Messages';
import ChatInfo from './UI/ChatInfo';
const logoSrc = require('../assets/images/logo.png');
const Chat = () => {
  const { data } = useContext(ChatContext);
  const displayName =
    auth.currentUser && auth.currentUser.phoneNumber
      ? auth.currentUser.phoneNumber
      : auth.currentUser?.displayName;
  const photoURL =
    auth.currentUser && auth.currentUser.photoURL
      ? auth.currentUser.photoURL
      : logoSrc;

  // const displayName =
  //   auth.currentUser && auth.currentUser.phoneNumber
  //     ? auth.currentUser.phoneNumber
  //     : ''
  return (
    <div className="chat">
      <div className="chat__content">
        <ChatInfo photoURL={photoURL} displayName={displayName!} />
        {/* <div className="userChat">

            <div className="navChat">
              <img
                className="userChatImg"
                src={data.user.photoURL || null || undefined}
                alt=""
              />
              <span>{data.user?.displayName}</span>

              <div className="userChatInfo">

              </div>
            </div>
          </div> */}
        <Messages />
        <InputPanel />
      </div>
    </div>
  );
};

export default Chat;

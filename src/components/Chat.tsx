import { useContext } from 'react';
import '../App.css';
import { ChatContext } from '../context/Chatcontext';
import { auth } from '../firebase';
import InputPanel from './InputPanel';
import Messages from './Messages';
import ChatInfo from './UI/ChatInfo';
;

const Chat = () => {
  const { data } = useContext(ChatContext);
  const displayName = auth.currentUser && auth.currentUser.displayName ? auth.currentUser.displayName : ''
  const photoURL = auth.currentUser && auth.currentUser.photoURL ? auth.currentUser.photoURL : ''

  return (
    <div className="chat">
      <div className="chats__content">
        <div className="chat__high">
        <ChatInfo
            photoURL={photoURL}
            displayName={displayName}
          />
          <div className="userChat">
            <div className="navChat">
              <img
                className="userChatImg"
                src={data.user.photoURL || null}
                alt=""
              />
              <span>{data.user?.displayName}</span>

              {/* <div className="userChatInfo">

        </div> */}
            </div>
          </div>
          <Messages />

          <div className="chat__low">
            <InputPanel />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;

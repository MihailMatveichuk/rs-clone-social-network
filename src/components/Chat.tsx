import { useContext } from 'react';
import '../App.css';
import { ChatContext } from '../context/Chatcontext';
import { auth } from '../firebase';
import InputPanel from './InputPanel';
import Messages from './Messages';
const Add = require('./assets/images/Add.png');
const Call = require('./assets/images/Call.png');
const Menu = require('./assets/images/Menu.png');

const Chat = () => {
  const { data } = useContext(ChatContext);
  return (
    <div className="chat">
      <div className="chats__content">
        <div className="chat__high">
          <div className="chatInfo">
            <div className="chatDescription">
              <img
                src={auth.currentUser?.photoURL || null || undefined}
                alt=""
              />
              <div className="chatText">
                <span className="name-chat">
                  {auth.currentUser?.displayName}
                </span>
                <span className="amount-members">online</span>
              </div>
            </div>
            <div className="chatIcons">
              <img src={Add} alt="" />
              <img src={Call} alt="" />
              <img src={Menu} alt="" />
            </div>
          </div>
          <div className="userChat">
            <div className="navChat">
              <img
                className="userChatImg"
                src={data.user.photoURL || null || undefined}
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

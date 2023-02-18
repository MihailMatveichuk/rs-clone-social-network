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

  return (
    <div className="chat">
      <div className="chat__content">
        {data.chatId && data.user &&
          <>
            <ChatInfo userRef={data.user} chatId={data.chatId} />
            <Messages />
            <InputPanel />
          </>
        }
      </div>
    </div>
  );
};

export default Chat;

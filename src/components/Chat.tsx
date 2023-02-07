import React, { useContext } from 'react';
import '../App.css';
import { ChatContext } from '../context/Chatcontext';
import InputPanel from './InputPanel';
import Messages from './Messages';

const Chat = () => {
  const { data } = useContext(ChatContext);
  return (
    <div className="chat">
      <div className="userChat">
        <span>{data.user?.displayName}</span>
        {/* <div className="userChatInfo">

        </div> */}
      </div>
      <Messages />
      <InputPanel />
    </div>
  );
};

export default Chat;

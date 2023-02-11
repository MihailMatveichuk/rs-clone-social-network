import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/Chatcontext';
import { IMessageProp } from '../types';

const Message = ({ message }: IMessageProp) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  let chatUserPhoto: string | undefined;
  if (currentUser != null && currentUser.photoURL != null) {
    chatUserPhoto =
      message.senderId === currentUser.uid
        ? currentUser.photoURL
        : data?.user?.photoURL;
  }
  return (
    <div className="message">
      <div className="message-info">
        <img src={chatUserPhoto} alt="" />
      </div>
      <div className="message-content">
        <span style={{ fontSize: '14px', fontWeight: 700 }}>
          {message.img && <img src={message.img} alt="" />}
          <span style={{ fontSize: '10px', fontWeight: 300 }}>
            {message.date.seconds}
          </span>
        </span>
        <span className="message-text">{message.text}</span>
      </div>
    </div>
  );
};

export default Message;

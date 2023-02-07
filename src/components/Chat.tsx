import React from 'react';
import '../assets/styles/chat.scss';
const Avatar1 = require('./assets/images/Avatar1.png');

const Chat = () => {
  return (
    <div className="chat">
      <div className="user-chat">
        <img src={Avatar1} alt="" />
        <div className="user-chat-info">
          <span className="user-name">Jeff Besos</span>
          <span className="user-descr">
            I don’t know how to spend all my money. Any ideas? 😚
          </span>
        </div>
      </div>
    </div>
  );
};

export default Chat;

import React from 'react';
import '../App.css';
const Avatar1 = require('./assets/images/Avatar1.png');

const Chat = () => {
  return (
    <div className="chat">
      <div className="userChat">
        <img src={Avatar1} alt="" />
        <div className="userChatInfo">
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

import React, { useContext, useEffect, useRef } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/Chatcontext';
const Rogan = require('./assets/images/Rogan.png');

const Message = ({ message }) => {
  console.log('message: ', message);
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  }, [message]);

  return (
    <div
      ref={ref}
      className={`message ${message.senderId === currentUser?.uid && 'owner'}`}
    >
      <div className="message-info">
        <img
          src={
            message.senderId === currentUser?.uid
              ? currentUser?.photoURL
              : data.user.photoURL
          }
          alt=""
        />
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

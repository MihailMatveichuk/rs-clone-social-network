import { doc, onSnapshot } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import { ChatContext } from '../context/Chatcontext';
import { db } from '../firebase';
import Message from './Message';
//import Message from './Message';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, 'chats', data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unSub();
    };
  }, [data.chatId]);

  console.log(messages);

  return (
    <div className="messages">
      {messages.map((m) => (
        <Message message={m} key={m.id} />
      ))}
      <span className="user-name">Jeff Besos</span>
      <span className="user-descr">
        I don’t know how to spend all my money. Any ideas? 😚
      </span>
    </div>
  );
};

export default Messages;

import { doc, onSnapshot } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import { ChatContext } from '../context/Chatcontext';
import { db } from '../firebase';
import { IMessageFirebase } from '../types';
import Message from './Message';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);

  useEffect(() => {
    if (data != undefined) {
      const unSub = onSnapshot(doc(db, 'chats', data.chatId), (doc) => {
        doc.exists() && setMessages(doc.data().messages);
      });

      return () => {
        unSub();
      };
    }
  }, [data.chatId]);

  return (
    <div className="messages">
      <div className="container">
      <ul className="messages__list">
        {messages.map((m: IMessageFirebase) => (
          <Message message={m} key={m.id} />
        ))}
      </ul>
      </div>
    </div>
  );
};

export default Messages;

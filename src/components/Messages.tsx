import { doc, onSnapshot } from 'firebase/firestore';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { ChatContext } from '../context/Chatcontext';
import { db } from '../firebase';
import { IMessageFirebase } from '../types';
import Message from './Message';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);
  const refs = useRef<HTMLLIElement>(null);
  useEffect(() => {
    //if (messages.length === 0) return;
    refs.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (data != undefined) {
      const unSub = onSnapshot(doc(db, 'chats', data.chatId), (doc) => {
        console.log(doc.exists());
        if (doc.exists()) {
          setMessages(doc.data().messages);
        } else {
          setMessages([]);
        }
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
          <li ref={refs}></li>
        </ul>
      </div>
    </div>
  );
};

export default Messages;

import { doc, DocumentData, getDoc, onSnapshot } from 'firebase/firestore';
import React, {useEffect, useState} from 'react';
import { db } from '../../firebase';



type ChatCardProps = {
  chat: DocumentData,
  handleSelect: ({uid, user}: {uid: string, user: string}) => void
}


const ChatCard:React.FC<ChatCardProps> = ({chat, handleSelect}) => {
  console.log(chat);
  
  const [user, setUser] = useState<DocumentData | null>(null)
  const getData = async () => {
    const unsub = onSnapshot(
      doc(db, 'users', chat.memberId),
      async (d) => {
        if (d && d.data()) {
          const data = d.data()
          console.log(data);
          
          if (data) {
            setUser(data)
          }
        }

      })
      return () => {
        unsub();
      };
  }
  useEffect(() => {
    getData()
  },[])


  return (
    <li
    className="user-chat"
    key={chat.uid}
    onClick={() => handleSelect({
      uid: chat.uid,
      user: user!.uid
    })}
    role="presentation"
  >
    {user && <div className="container">
      <div className="user-chat__inner">
      
          <img
            className="user-chat__img"
            src={user.photoUrl}
            alt=""
          />
        
        <div className="user-chat__message">
          
            <span>{user.displayName}</span>
          
          <div>{chat.lastMessage} <span>({user.online.toString()})</span></div>
        </div>
      </div>
    </div>}
  </li>
  );
};

export default ChatCard;
import { doc, DocumentData, getDoc, onSnapshot } from 'firebase/firestore';
import React, {useEffect, useState} from 'react';
import { db } from '../../firebase';



type ChatCardProps = {
  chat: DocumentData,
  handleSelect: ({uid, user}: {uid: string, user: string}) => void
}


const ChatCard:React.FC<ChatCardProps> = ({chat, handleSelect}) => {
  const [user, setUser] = useState(null)
  console.log(chat);
  
  // const docRef = doc(db, 'users',data.chats[i].memberId);
  // const docSnap =  await getDoc(docRef);
  // console.log(docSnap.data());
  const gtChats = async () => {
    const docRef = doc(db, 'users',chat[1].memberId);
    const docSnap =  await getDoc(docRef);
    console.log(docSnap.data());
    
    // const unsub = onSnapshot(

    //   doc(db, 'users', chat[1].memberId),
    //   (doc) => {
    //     if (doc && doc.data()) {
    //       const data = doc.data()
    //       if (data) {
    //         console.log(data)
    //       }
    //     }
    //   }
    // );
    // return () => {
    //   unsub();
    // };
  };

  useEffect(() => {
    gtChats();
  }, []);

  return (
    <li
    className="user-chat"
    key={chat[0]}
    // onClick={() => handleSelect({
    //   uid: chat[1].uid,
    //   user: chat[1].user.uid
    // })}
    role="presentation"
  >
    {user && <div className="container">
      <div className="user-chat__inner">
      
          <img
            className="user-chat__img"
            src={chat[1].user.photoUrl}
            alt=""
          />
        
        <div className="user-chat__message">
          
            <span>{chat[1].user.displayName}</span>
          
          <div>{chat[1].lastMessage} <span>({chat[1].user.online.toString()})</span></div>
        </div>
      </div>
    </div>}
  </li>
  );
};

export default ChatCard;
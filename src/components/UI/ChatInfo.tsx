import { doc, DocumentData, onSnapshot } from 'firebase/firestore';
import React, {useState, useEffect} from 'react';
import { db } from '../../firebase';
// const Add = require('../../assets/images/Add.png');
// const Call = require('../../assets/images/Call.png');
// const Menu = require('./assets/images/Menu.png');

type ChatInfoProps = {
  userRef: string;
  chatId: string;
};

const ChatInfo: React.FC<ChatInfoProps> = ({ userRef , chatId}) => {
  
  const [user, setUser] = useState<DocumentData | null>(null)
  const getData = async () => {
    const unsub = onSnapshot(
      doc(db, 'users', userRef),
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
  },[chatId])

  return (
    <div className="chat-info">
      <div className="container">
        <div className="chat-info__inner">
          <div className="chat-info__description">
            {user && 
              <>
                <img src={user.photoUrl} alt="" />
                <div className="chatText">
                  <span className="name-chat">{user.displayName}</span>
                  <span className="amount-members">{user.online ? 'online' : 'offline'}</span>
                </div>
              </>
            }
          </div>
          <div className="chatIcons">
            {/* <img src={Add} alt="" />
          <img src={Call} alt="" />
          <img src={Menu} alt="" /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInfo;

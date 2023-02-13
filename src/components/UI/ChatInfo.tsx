import React from 'react';
// const Add = require('../../assets/images/Add.png');
// const Call = require('../../assets/images/Call.png');
// const Menu = require('./assets/images/Menu.png');


type ChatInfoProps = {
  photoURL: string;
  displayName: string;
}

const ChatInfo: React.FC<ChatInfoProps> = ({photoURL, displayName}) => {
  return (
    <div className="chat-info">
      <div className="container">
        <div className="chat-info__inner">
          <div className="chat-info__description">
            <img src={photoURL} alt="" />
            <div className="chatText">
              <span className="name-chat">
                {displayName}
              </span>
              <span className="amount-members">online</span>
            </div>
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
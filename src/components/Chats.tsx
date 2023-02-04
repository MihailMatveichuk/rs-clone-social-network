const Tesla = require('./assets/images/Tesla.png');
const Add = require('./assets/images/Add.png');
const Call = require('./assets/images/Call.png');
const Menu = require('./assets/images/Menu.png');
import Messages from './Messages';
import InputPanel from './InputPanel';

const Chats = () => {
  return (
    <div className="chats">
      <div className="chatInfo">
        <div className="chatDescription">
          <img src={Tesla} alt="" />
          <div className="chatText">
            <span className="name-chat">Tesla Board</span>
            <span className="amount-members">12 members</span>
          </div>
        </div>
        <div className="chatIcons">
          <img src={Add} alt="" />
          <img src={Call} alt="" />
          <img src={Menu} alt="" />
        </div>
      </div>
      <Messages />
      <InputPanel />
    </div>
  );
};

export default Chats;

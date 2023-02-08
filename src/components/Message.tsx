const Rogan = require('./assets/images/Rogan.png');

const Message = ({ message }) => {
  return (
    <div className="message">
      <div className="message-info">
        <img src={Rogan} alt="" />
      </div>
      <div className="message-content">
        <span style={{ fontSize: '14px', fontWeight: 700 }}>
          Joe Rogan{' '}
          <span style={{ fontSize: '10px', fontWeight: 300 }}>9:59 PM</span>
        </span>
        <span className="message-text">
          Thanks for doing this, Elon Musk. Really appreciate it.
        </span>
      </div>
    </div>
  );
};

export default Message;

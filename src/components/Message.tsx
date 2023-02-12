import { getDownloadURL, ref, listAll } from 'firebase/storage';
import { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/Chatcontext';

// import ReactPlayer from 'react-player';
import { storage } from '../firebase';

const Message = ({ message }) => {
  const [listUrl, setListUrl] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const refs = useRef();
  const messageExst =
    message.text.split('.')[message.text.split('.').length - 1];

  const imageListRef = ref(storage, `images/`);

  useEffect(() => {
    listAll(imageListRef).then((res) => {
      res.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setListUrl((prev) => [...prev, url]);
        });
      });
    });
  }, []);

  useEffect(() => {
    refs.current?.scrollIntoView({ behavior: 'smooth' });
  }, [message]);

  const arr = listUrl.find((item) =>
    item.includes(message.text || message.text.replaceAll(/ /g, '%'))
  );

  return (
    <div
      ref={refs}
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
            {Date(message.date.seconds)}
          </span>
        </span>
        <span className="message-text">
          {messageExst == 'jpg' ||
          messageExst == 'jpeg' ||
          messageExst == 'png' ? (
            <img className="message__img" src={arr} alt="" />
          ) : (
            // messageExst == 'mkv' ? (
            // <ReactPlayer width={300} height={200} url={arr} />
            // ) : (
            // <video width="200" height="200">
            //   <source
            //     src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
            //     type="video/mp4"
            //   />
            //   <track
            //     src={arr}
            //     kind="captions"
            //     srcLang="en"
            //     label="english_captions"
            //   ></track>
            // </video>
            message.text
          )}
        </span>
      </div>
    </div>
  );
};

export default Message;

import { getDownloadURL, ref, listAll } from 'firebase/storage';
import { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/Chatcontext';
import { storage } from '../firebase';
import { IMessageProp } from '../types';
import { ColorRing } from 'react-loader-spinner';
<ColorRing
  visible={true}
  height="50"
  width="50"
  ariaLabel="blocks-loading"
  wrapperStyle={{}}
  wrapperClass="blocks-wrapper"
  colors={['#b8c480', '#B2A3B5', '#F4442E', '#51E5FF', '#429EA6']}
/>;
const Message = ({ message }: IMessageProp) => {
  const { currentUser } = useContext(AuthContext);
  const [listUrl, setListUrl] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const { data } = useContext(ChatContext);
  let chatUserPhoto: string | undefined;
  if (currentUser != null && currentUser.photoURL != null) {
    chatUserPhoto =
      message.senderId === currentUser.uid
        ? currentUser.photoURL
        : data?.user?.photoURL;
  }

  const refs = useRef<HTMLDivElement>(null);

  const messageExst =
    message.text.split('.')[message.text.split('.').length - 1];

  const imageListRef = ref(storage, `images/`);

  useEffect(() => {
    setLoading(true);
    listAll(imageListRef).then((res) => {
      res.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setListUrl((prev) => [...prev, url]);
        });
      });
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    refs.current?.scrollIntoView({ behavior: 'smooth' });
  }, [message]);

  const arr = listUrl.find((item) =>
    item.includes(message.text || message.text.replaceAll(/ /g, '%'))
  );
  return (
    <li
      ref={refs}
      className={`message ${message.senderId === currentUser?.uid ? 'owner' : 'sender'}`}
    >
      <div className="message__user-photo">
        <img src={chatUserPhoto} alt="" />
      </div>
      <div className="message-content">

        <span style={{ fontSize: '14px', fontWeight: 700 }}>
          {message.img && <img src={message.img} alt="" />}
        </span>
          <div className="message-info">
          {/* <div className="message-info-name">{}</div> */}
          <div className="message-info-time">
            {new Date(message.date.seconds).toLocaleString()}
          </div>
        </div>

/*
        {loading ? (
          <ColorRing />
        ) : (
          <span style={{ fontSize: '14px', fontWeight: 700 }}>
            {message.img && <img src={message.img} alt="" />}
            <span style={{ fontSize: '10px', fontWeight: 300 }}>
              {new Date(message.date.seconds).toLocaleString()}
            </span>
          </span>
        )}
        */

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
    </li>
  );
};

export default Message;

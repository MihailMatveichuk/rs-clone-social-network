import { getDownloadURL, ref, listAll } from 'firebase/storage';
import { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/Chatcontext';
import { storage } from '../firebase';
import { IMessageProp } from '../types';
import { ColorRing } from 'react-loader-spinner';
import '../assets/styles/style.css';

const Like = require('./assets/images/Like.png');
const Dislike = require('./assets/images/Dislike.png');


const Message = ({ message }: IMessageProp) => {
  const { currentUser } = useContext(AuthContext);
  const [listUrl, setListUrl] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const { data } = useContext(ChatContext);
  const [like, setLike] = useState(0);
  const [dislike, setDislike] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isHeart, setIsDislike] = useState(false);


  const likeHandler = () => {
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  const dislikeHandler = () => {
    setDislike(isHeart ? dislike - 1 : dislike + 1);
    setIsDislike(!isHeart);
  };

  let chatUserPhoto: string | undefined;
  if (currentUser != null && currentUser.photoURL != null) {
    chatUserPhoto =
      message.senderId === currentUser.uid
        ? currentUser.photoURL
        : data?.user?.photoURL;
  }


  const messageExst =
    message.text.split('.')[message.text.split('.').length - 1];

  const imageListRef = ref(storage, `images/${data.chatId}`);

  useEffect(() => {
    if ((messageExst == 'jpg' ||
    messageExst == 'jpeg' ||
    messageExst == 'png') && !loading) {
      setLoading(true)
    }
    listAll(imageListRef).then((res) => {
      res.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setListUrl((prev) => [...prev, url]);
        });
      });
    });
  }, []);

  const onImgLoadHandler = (e) => {
    if (e.target.complete) {
      setLoading(false)      
    }
  }

  const arr = listUrl.find((item) =>
    item.includes(message.text || message.text.replaceAll(/ /g, '%'))
  );
  return (
    <li
      className={`message ${
        message.senderId === currentUser?.uid ? 'owner' : 'sender'
      }`}
    >
      <div className="message__user-photo">
        <img src={chatUserPhoto} alt="" />
      </div>
      <div className="message-content">
        <span style={{ fontSize: '14px', fontWeight: 700 }}>
          {message.img && <img src={message.img} alt="" />}
        </span>
        <div className="message-info">
          <div className="message-info-time">
            {new Date(message.date.seconds).toLocaleString()}
          </div>
        </div>
        {loading && 
          <ColorRing />
        }
        <span className="message-text">
          {messageExst == 'jpg' ||
          messageExst == 'jpeg' ||
          messageExst == 'png' ? (
            <img className="message__img" src={arr} alt="" onLoad={onImgLoadHandler} />
          ) : (
            message.text
          )}
        </span>
        <div className="reaction">
          <img
            className="dislike"
            src={Dislike}
            onClickCapture={dislikeHandler}
            alt=""
          />
          <span className="post__like__counter">{dislike}</span>
          <img
            style={{ width: '25px' }}
            src={Like}
            onClickCapture={likeHandler}
            alt=""
          />
          <span className="post__like__counter">{like}</span>
        </div>
      </div>
    </li>
  );
};

export default Message;

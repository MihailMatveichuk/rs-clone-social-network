import { getDownloadURL, ref, listAll } from 'firebase/storage';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/Chatcontext';
import { db, storage } from '../firebase';
import { IMessageProp } from '../types';
import { ColorRing } from 'react-loader-spinner';
import '../assets/styles/style.scss';
import { doc, DocumentData, onSnapshot } from 'firebase/firestore';

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
  const [user, setUser] = useState<DocumentData | null>(null);

  const likeHandler = () => {
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  onSnapshot(doc(db, 'users', data.user), async (d) => {
    if (d && d.data()) {
      const data = d.data();
      if (data) {
        setUser(data);
      }
    }
  });

  const dislikeHandler = () => {
    setDislike(isHeart ? dislike - 1 : dislike + 1);
    setIsDislike(!isHeart);
  };

  let chatUserPhoto: string | undefined;
  if (currentUser != null && currentUser.photoURL != null) {
    chatUserPhoto =
      message.senderId === currentUser.uid
        ? currentUser.photoURL
        : user?.photoUrl;
  }

  const messageExst =
    message.text.split('.')[message.text.split('.').length - 1];
  const imageListRef = ref(storage, `images/${data.chatId}`);
  useEffect(() => {
    if (
      (messageExst == 'jpg' || messageExst == 'jpeg' || messageExst == 'png') &&
      !loading
    ) {
      setLoading(true);
    }
    listAll(imageListRef).then((res) => {
      res.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setListUrl((prev) => [...prev, url]);
        });
      });
    });
  }, []);

  const onImgLoadHandler = (e: { target: { complete: any } }) => {
    if (e.target.complete) {
      setLoading(false);
    }
  };

  const imgSrc = listUrl.find((item) => {
    return item.includes(message.text || message.text.replaceAll(/ /g, '%'));
  });

  const videoSrc = listUrl.find((item) => {
    return item;
  });
  const videoExtensions = ['mp4', 'm4v', 'webm', 'ogv', 'flv', 'mkv', 'avi'];

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
        {loading && <ColorRing />}
        <span className="message-text">
          {videoExtensions.includes(messageExst) ? (
            <video width="400px" src={videoSrc} controls>
              <track
                src={videoSrc}
                kind="captions"
                srcLang="en"
                label="English"
              ></track>
            </video>
          ) : messageExst == 'jpg' ||
            messageExst == 'jpeg' ||
            messageExst == 'png' ? (
            <img
              className="message__img"
              src={imgSrc}
              alt=""
              onLoad={onImgLoadHandler}
            />
          ) : message.text.includes('https://www') ? (
            <a href={message.text} target="_blank" rel="noreferrer">
              message.text
            </a>
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

import { getDownloadURL, ref, listAll } from 'firebase/storage';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/Chatcontext';
import { storage } from '../firebase';
import { IMessageProp } from '../types';
import { ColorRing } from 'react-loader-spinner';
import '../assets/styles/style.scss';

import { checkUser } from '../api';
import { getExtension } from '../utlis/getExtension';
const Avatar = require('../assets/images/Avatar.png');
// import { doc, DocumentData, onSnapshot } from 'firebase/firestore';

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
  const [photo, setPhoto] = useState(currentUser!.photoURL);
  const messageExst = getExtension(message.text)
  console.log(messageExst);
  
  const getPhoto = async () => {
      if (message.senderId !== currentUser!.uid) {
        const user = await checkUser(message.senderId);
        setPhoto(user!.photoURL || Avatar);
      } else {
        setPhoto(currentUser!.photoURL || Avatar);
    }
  };

  useEffect(() => {
    getPhoto();
  }, []);

  const likeHandler = () => {
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  // onSnapshot(doc(db, 'users', data.user), async (d) => {
  //   if (d && d.data()) {
  //     const data = d.data();
  //     if (data) {
  //       setUser(data);
  //     }
  //   }
  // });

  const dislikeHandler = () => {
    setDislike(isHeart ? dislike - 1 : dislike + 1);
    setIsDislike(!isHeart);
  };

  const date = message.date.toDate().toLocaleString();


  const imageListRef = ref(storage, `images/${data.chatId}`);

  useEffect(() => {
    if (
      messageExst === 'img' &&
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

  const onImgLoadHandler = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    console.log(e);
    
    if (e.currentTarget.complete) {
      setLoading(false);
    }
  };
console.log(listUrl);

  const imgSrc = listUrl.find((item) => {
    const text = message.text.split(' ').join('%20')
    return item.includes(text || text.replaceAll(/ /g, '%'));
  });
  console.log(imgSrc, message.text);
  

  const videoSrc = listUrl.find((item) => {
    return item;
  });

  return (
    <li
      className={`message ${
        message.senderId === currentUser?.uid ? 'owner' : 'sender'
      }`}
    >
      <div className="message__user-photo">
        <img src={photo!} alt="" />
      </div>
      <div className="message-content">
        <span style={{ fontSize: '14px', fontWeight: 700 }}>
          {message.img && <img src={message.img} alt="" />}
        </span>
        <div className="message-info">
          <div className="message-info-time">{date}</div>
        </div>
        {loading && <ColorRing />}
        <span className="message-text">
          {messageExst === 'video' &&
            <video width="400px" src={videoSrc} controls>
              <track
                src={videoSrc}
                kind="captions"
                srcLang="en"
                label="English"
              ></track>
            </video>
          }
          {messageExst === 'img' &&
            <img
              className="message__img"
              src={imgSrc}
              alt=""
              onLoad={onImgLoadHandler}
            />
          }
          {messageExst === 'url' &&
            <a href={message.text} target="_blank" rel="noreferrer">
              message.text
            </a>
          }
          {messageExst === 'text' &&
              message.text
          }
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

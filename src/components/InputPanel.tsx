import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from 'firebase/firestore';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/Chatcontext';
import { uuidv4 } from '@firebase/util';
import { db, storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import EmojiPicker from 'emoji-picker-react';
import '../App.css';

const Attach = require('./assets/images/Attached.png');
const Smile = require('./assets/images/Smile.png');
const Send = require('./assets/images/Send.png');

const InputPanel = () => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const [text, setText] = useState('');
  const [showPicker, setShowPicker] = useState(false);
  const [image, setImage] = useState('');

  const ImageRef = ref(storage, `images/${image.name}`);

  const handleSend = async () => {
    if (typeof data != 'undefined') {
      await updateDoc(doc(db, 'chats', data.chatId), {
        messages: arrayUnion({
          id: uuidv4(),
          text,
          senderId: currentUser!.uid,
          date: Timestamp.now(),
        }),
      });
      await updateDoc(doc(db, 'userChats', currentUser!.uid), {
        [data.chatId + '.lastMessage']: {
          text,
        },
        [data.chatId + '.date']: serverTimestamp(),
      });
      await updateDoc(doc(db, 'userChats', data.user.uid), {
        [data.chatId + '.lastMessage']: {
          text,
        },
        [data.chatId + '.date']: serverTimestamp(),
      });
      setText('');
    }

    setText('');
    await uploadBytes(ImageRef, image).then((snapshot) => {
      getDownloadURL(snapshot.ref);
    });
    await updateDoc(doc(db, 'chats', data.chatId), {
      messages: arrayUnion({
        id: uuidv4(),
        text,
        senderId: currentUser!.uid,
        date: Timestamp.now(),
      }),
    });
    await updateDoc(doc(db, 'userChats', currentUser.uid), {
      [data.chatId + '.lastMessage']: {
        text,
      },
      [data.chatId + '.date']: serverTimestamp(),
    });
    await updateDoc(doc(db, 'userChats', data.user.uid), {
      [data.chatId + '.lastMessage']: {
        text,
      },
      [data.chatId + '.date']: serverTimestamp(),
    });
  };

  const onEmojiClick = (emojiObject: { emoji: string }) => {
    setText((prevText) => prevText + emojiObject.emoji);
    setShowPicker(false);
  };

  const onKeyDown = (e: { code: string }) => {
    e.code === 'Enter' ? handleSend() : null;
  };

  return (
    <div className="input-panel">
      <input
        type="file"
        style={{ display: 'none' }}
        id="file"
        onChange={(e) => {
          setText(e.target.files[0].name), setImage(e.target.files[0]);
        }}
      />
      <label htmlFor="file">
        <img src={Attach} alt="file" />
      </label>
      <div className="input_container">
        <input
          type="text"
          placeholder="Insert message"
          onChange={(e) => setText(e.target.value)}
          value={text}
          onKeyDownCapture={onKeyDown}
        />
        <img
          src={Smile}
          alt=""
          onClickCapture={() => setShowPicker((val) => !val)}
        />
      </div>
      <div className="emoji__picker">
        {showPicker && <EmojiPicker onEmojiClick={onEmojiClick} />}
      </div>
      <button onClick={handleSend}>
        <img src={Send} alt="send-icon" />
      </button>
    </div>
  );
};

export default InputPanel;

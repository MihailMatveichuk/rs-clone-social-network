import {
  arrayUnion,
  doc,
  getDoc,
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

const InputPanel = () => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const [text, setText] = useState('');
  const [showPicker, setShowPicker] = useState(false);
  const [image, setImage] = useState<File | null>(null);

  const ImageRef = ref(storage, `images/${data.chatId}/${image?.name}`);

  const handleSend = async () => {
    setText('');
    if (data.chatId) {
      await uploadBytes(ImageRef, image!).then((snapshot) => {
        getDownloadURL(snapshot.ref);
      });
      await updateDoc(doc(db, 'messages', data.chatId), {
        messages: arrayUnion({
          id: uuidv4(),
          text,
          senderId: currentUser!.uid,
          date: Timestamp.now(),
        }),
      });
      const docRef = doc(db, 'chats', currentUser!.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const chats = [...docSnap.data().chats];
        const index = chats.findIndex((chat) => chat.memberId === data.user!);
        chats[index] = {
          ...chats[index],
          lastMessage: text,
        };
        await updateDoc(docRef, {
          chats,
        });
      }
      const docRef1 = doc(db, 'chats', data.user!);
      const docSnap1 = await getDoc(docRef1);
      if (docSnap1.exists()) {
        const chats = [...docSnap1.data().chats];
        const index = chats.findIndex(
          (chat) => chat.memberId === currentUser!.uid
        );
        chats[index] = {
          ...chats[index],
          lastMessage: text,
        };
        await updateDoc(docRef1, {
          chats,
        });
      }
    }
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
      <div className="container">
        <div className="input-panel__inner">
          <input
            type="file"
            style={{ display: 'none' }}
            id="file"
            onChange={(e) => {
              if (e.target.files != null)
                setText(e.target.files[0].name), setImage(e.target.files[0]);
            }}
          />
          <label htmlFor="file">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_12353_8993)">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M3.86922 8.11078L9.87963 2.10038C12.4366 -0.456626 16.2534 -0.0111717 18.3649 2.10038C20.4765 4.21193 20.9219 8.02863 18.3649 10.5857L12.3545 16.596C10.8581 18.0924 8.63243 17.8237 7.40475 16.5961C6.17709 15.3684 5.90841 13.1427 7.40475 11.6463L11.2938 7.75723C11.6844 7.36671 12.3175 7.36671 12.7081 7.75723C13.0986 8.14775 13.0986 8.78092 12.7081 9.17144L8.81897 13.0605C8.19399 13.6855 8.27886 14.6418 8.81896 15.1819C9.35905 15.7219 10.3153 15.8068 10.9403 15.1818L16.9507 9.17145C18.6363 7.48579 18.3747 4.93857 16.9507 3.51459C15.5267 2.09061 12.9795 1.82895 11.2938 3.51459L5.28343 9.525C2.52261 12.2858 2.81417 16.2481 5.28343 18.7174C7.75269 21.1866 11.715 21.4782 14.4758 18.7174L18.3649 14.8283C18.7554 14.4378 19.3886 14.4378 19.7791 14.8283C20.1696 15.2188 20.1696 15.852 19.7791 16.2425L15.89 20.1316C12.2869 23.7347 7.05681 23.3192 3.86922 20.1316C0.681626 16.944 0.266074 11.7139 3.86922 8.11078Z"
                  // fill="#71747A"
                  className="svgFill"
                />
              </g>
              <defs>
                <clipPath id="clip0_12353_8993">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </label>
          <div className="input-panel__input-container">
            <input
              type="text"
              placeholder="Write a message..."
              onChange={(e) => setText(e.target.value)}
              value={text}
              onKeyDownCapture={onKeyDown}
            />
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onMouseEnter={() => setShowPicker(true)}
              onMouseLeave={() => setShowPicker(false)}
            >
              <g clipPath="url(#clip0_17999_39560)">
                <path
                  d="M12.5 8.74959C13.1904 8.74959 13.75 8.18995 13.75 7.49959C13.75 6.80924 13.1904 6.24959 12.5 6.24959C11.8096 6.24959 11.25 6.80924 11.25 7.49959C11.25 8.18995 11.8096 8.74959 12.5 8.74959Z"
                  // fill="#71747A"
                  className="svgFill"
                />
                <path
                  d="M8.75 7.5C8.75 8.19036 8.19036 8.75 7.5 8.75C6.80964 8.75 6.25 8.19036 6.25 7.5C6.25 6.80964 6.80964 6.25 7.5 6.25C8.19036 6.25 8.75 6.80964 8.75 7.5Z"
                  // fill="#71747A"
                  className="svgFill"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6.25 1.25C3.48857 1.25 1.24999 3.48859 1.25 6.25002L1.25003 13.75C1.25004 16.5114 3.48862 18.75 6.25003 18.75L9.58333 18.7504C9.59925 18.7504 9.61514 18.7503 9.63099 18.75H11.0477C11.9318 18.75 12.7797 18.3987 13.4048 17.7736L17.7734 13.4048C18.3984 12.7797 18.7496 11.9319 18.7496 11.0478V9.62598C18.7498 9.61193 18.7499 9.59785 18.7499 9.58374L18.7496 6.25C18.7496 3.48858 16.511 1.25 13.7496 1.25H6.25ZM17.0829 9.60812V6.25C17.0829 4.40905 15.5905 2.91667 13.7496 2.91667H6.25C4.40905 2.91667 2.91666 4.40906 2.91667 6.25001L2.9167 13.75C2.91671 15.5909 4.40909 17.0833 6.25003 17.0833H9.61083C10.0583 17.0688 10.4167 16.7014 10.4167 16.2504L10.4167 15.414C10.4169 14.9772 10.4732 14.5536 10.5787 14.1498C10.4003 14.1607 10.2078 14.1667 10 14.1667C8.72877 14.1667 7.72694 13.6576 7.06199 13.174C6.72791 12.931 6.46965 12.6881 6.29292 12.5037C6.20422 12.4112 6.13505 12.3323 6.08618 12.2741C6.06172 12.2449 6.04226 12.2208 6.02789 12.2027L6.01014 12.18L6.00414 12.1721L6.00185 12.1691L6.00089 12.1678C5.99965 12.1662 6.00005 12.1667 6.00005 12.1667C5.72391 11.7985 5.79853 11.2762 6.16672 11C6.53375 10.7248 7.05395 10.7981 7.33077 11.1632L7.33463 11.1682C7.33959 11.1744 7.34902 11.1862 7.36281 11.2026C7.39043 11.2355 7.43521 11.2869 7.49624 11.3505C7.61899 11.4786 7.80344 11.6524 8.04227 11.8261C8.52316 12.1758 9.18799 12.5 10 12.5C10.7664 12.5 11.1947 12.404 11.4032 12.3345C11.4511 12.3185 11.4872 12.304 11.5129 12.2926C12.4237 11.1562 13.8203 10.426 15.3879 10.4172C15.3974 10.4168 15.407 10.4167 15.4167 10.4167H16.2762C16.7162 10.403 17.0703 10.0483 17.0829 9.60812ZM12.0833 16.7225C12.1331 16.683 12.1809 16.6405 12.2263 16.5951L16.5948 12.2263C16.6402 12.1809 16.6827 12.1332 16.7222 12.0833H16.2955C16.2804 12.0836 16.2652 12.0837 16.2499 12.0837H15.4167C14.331 12.0837 13.3666 12.6028 12.758 13.4062C12.7529 13.4131 12.7477 13.42 12.7425 13.4268C12.3284 13.9823 12.0833 14.671 12.0833 15.4171V16.7225Z"
                  // fill="#71747A"
                  className="svgFill"
                />
              </g>
              <defs>
                <clipPath id="clip0_17999_39560">
                  <rect width="20" height="20" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
          <div
            className="emoji__picker"
            onMouseEnter={() => setShowPicker(true)}
            onMouseLeave={() => setShowPicker(false)}
          >
            {showPicker && <EmojiPicker onEmojiClick={onEmojiClick} />}
          </div>
          <button title="button" onClick={handleSend}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.9757 1.70126C5.98621 1.70708 5.99672 1.71291 6.00722 1.71872L21.7512 10.4417C21.9315 10.5416 22.1218 10.6469 22.2722 10.7492C22.4243 10.8527 22.6836 11.0473 22.8347 11.3803C23.0134 11.7741 23.0134 12.226 22.8347 12.6198C22.6836 12.9528 22.4242 13.1474 22.2722 13.2509C22.1218 13.3532 21.9315 13.4585 21.7512 13.5584L5.97569 22.2989C5.7612 22.4178 5.54495 22.5376 5.35982 22.6194C5.18618 22.6961 4.84427 22.8339 4.44386 22.7619C3.98717 22.6797 3.59421 22.3908 3.37956 21.9794C3.19137 21.6187 3.22096 21.2513 3.24236 21.0627C3.26518 20.8616 3.31508 20.6194 3.36457 20.3792L4.20399 16.3021C4.21383 16.2543 4.22351 16.2071 4.23305 16.1606C4.41043 15.2963 4.54421 14.6443 4.86504 14.0852C5.14739 13.5932 5.53117 13.1668 5.99091 12.8345C6.5057 12.4623 7.12915 12.2613 7.95198 12.0001C7.12915 11.7388 6.5057 11.5378 5.99091 11.1657C5.53117 10.8333 5.14739 10.4069 4.86504 9.91489C4.54421 9.35577 4.41043 8.70386 4.23305 7.83951C4.22351 7.79297 4.21383 7.74582 4.20399 7.69804L3.37185 3.65618C3.36943 3.64443 3.367 3.63267 3.36458 3.6209C3.31508 3.38071 3.26518 3.13853 3.24236 2.93743C3.22096 2.74883 3.19137 2.38137 3.37956 2.02067C3.59421 1.60927 3.98717 1.32038 4.44386 1.23822C4.84427 1.16619 5.18619 1.30404 5.35982 1.38073C5.54495 1.4625 5.76121 1.58237 5.9757 1.70126ZM5.41849 3.679L6.16291 7.29473C6.3831 8.36426 6.45912 8.67443 6.59973 8.91947C6.74091 9.16549 6.9328 9.37867 7.16266 9.54485C7.39161 9.71037 7.69211 9.81848 8.73267 10.1496L11.5536 11.0471C11.9686 11.1792 12.2504 11.5646 12.2504 12.0001C12.2504 12.4355 11.9686 12.8209 11.5536 12.953L8.73267 13.8505C7.69211 14.1816 7.39161 14.2897 7.16266 14.4553C6.9328 14.6214 6.74091 14.8346 6.59973 15.0806C6.45912 15.3257 6.3831 15.6359 6.16291 16.7054L5.41849 20.3211L20.437 12.0001L5.41849 3.679Z"
                // fill="#71747A"
                className="svgFill"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default InputPanel;

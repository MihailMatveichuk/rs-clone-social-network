import {
  arrayUnion,
  collection,
  doc,
  DocumentData,
  getDoc,
  setDoc,
  Timestamp,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../firebase';
import { uuidv4 } from '@firebase/util';
import { Themes } from '../utlis/theme';

const usersRef = collection(db, 'users');

const userChatsRef = collection(db, 'chats');

const messagesRef = collection(db, 'messages');

type createUserWithEmail = {
  email: string;
  uid: string;
};

export const checkUser = async (uid: string): Promise<DocumentData | null> => {
  if (!uid) return null;
  const docRef = doc(db, 'users', uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return null;
  }
};

export const createUserViaEmail = async ({
  email,
  uid,
}: createUserWithEmail) => {
  await setDoc(doc(usersRef, uid), {
    photoUrl: '',
    uid,
    online: true,
    email,
    phone: '',
    displayName: email,
    lastSeen: null,
    about: '',
    createdAt: Timestamp.now(),
  });

  await setDoc(doc(userChatsRef, uid), {
    chats: [],
  });
};

export const getChat = async (uid: string, uid2: string) => {
  const docRef = doc(db, `chats`, uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const chats = docSnap.data().chats;
    const chat = chats.filter((chat) => chat.memberId === uid2);
    return chat.length === 0 ? null : chat;
  } else {
    return null;
  }
};

export const createChat = async (uid: string, uid2: string) => {
  const uidChat = uuidv4();
  const user1 = await checkUser(uid);
  const user2 = await checkUser(uid2);
  await updateDoc(doc(db, 'chats', uid), {
    chats: arrayUnion({
      uid: uidChat,
      id: uid,
      text: null,
      memberId: user2!.uid,
      date: Timestamp.now(),
      lastMessage: null,
    }),
  });
  await updateDoc(doc(db, 'chats', uid2), {
    chats: arrayUnion({
      uid: uidChat,
      id: uid,
      text: null,
      memberId: user1!.uid,
      date: Timestamp.now(),
      lastMessage: null,
    }),
  });
};

export const createChatMessages = async (uid: string | null) => {
  if (!uid) return;
  await setDoc(doc(messagesRef, uid), {
    messages: [],
  });
};

export const logoutUser = async (uid: string | null) => {
  if (!uid) return;
  const user = await checkUser(uid);
  const theme = sessionStorage.getItem('theme');
  if (theme) {
    sessionStorage.removeItem('theme');
  }
  await updateDoc(doc(usersRef, uid), {
    ...user,
    online: false,
    lastSeen: Timestamp.now(),
  });
};

export const loginUser = async (uid: string | null) => {
  if (!uid) return;
  const user = await checkUser(uid);
  await updateDoc(doc(usersRef, uid), {
    ...user,
    online: true,
    lastSeen: null,
  });
};

export const changeUserTheme = async (uid: string | null, theme: Themes) => {
  if (!uid) return;
  const user = await checkUser(uid);
  await updateDoc(doc(usersRef, uid), {
    ...user,
    theme,
  });
};

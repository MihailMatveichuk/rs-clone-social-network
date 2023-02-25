import React from 'react';
import Aside from '../../components/Aside';
import Chat from '../../components/Chat';
import Layout from '../Layout';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  updateDoc,
  doc,
  serverTimestamp,
  onSnapshot,
  getDoc,
  DocumentData,
} from 'firebase/firestore';
import { db } from '../../firebase';
import { ActionType, authUser } from '../../types';
import { ChatContext } from '../../context/Chatcontext';
import { createChat, getChat, checkUser } from '../../api';
import SearchInput from '../../components/UI/SearchInput';
import Chats from '../../components/Chats';
import { useSearchParams } from 'react-router-dom';
const ChatPage = () => {

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);
  const [chats, setChats] = useState<DocumentData | undefined>([]);
  const [users, setUsers] = useState<DocumentData | undefined>([]);
  const [err, setError] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [params] = useSearchParams();
  const gtChats = () => {
    setLoading(true);
    const unsub = onSnapshot(doc(db, 'chats', currentUser!.uid), async (d) => {
      if (d && d.data()) {
        const data = d.data();
        if (data) {
          setChats(data.chats);
        }
      }
      setLoading(false);
    });
    return () => {
      unsub();
    };
  };

  useEffect(() => {
    currentUser?.uid && gtChats();
  }, [currentUser?.uid]);


  const getChatById = async (uid: string) => {
    const user = await checkUser(uid);
    if (user) {
       handleSelect(user as authUser);
    }
  }

  useEffect(() => {
    if (params && currentUser) {
      const memberId = params.get('chat')
      if (memberId) {
        getChatById(memberId)
      }
    }
  }, [params]);

  const handleSelect = async (user: authUser) => {
    const chat = await getChat(currentUser!.uid, user.uid);
    console.log(user);
    
    if (!chat) {
      await createChat(currentUser!.uid, user.uid);
      setUsers([]);
    }
    const newChat = await getChat(currentUser!.uid, user.uid);
    dispatch({ type: ActionType.ChangeUser, payload: {
      user: user.uid,
      uid: newChat[0]!.id
    } });
  };

  const onEnterHandler = async (val: string) => {
    const q = query(
      collection(db, 'users'),
      where('displayName', '>=', val),
      where('displayName', '<=', val + '\uf8ff')
      //where('displayName', 'in', val)
    );
    try {
      const querySnapshot = await getDocs(q);
      const arr: DocumentData = [];
      querySnapshot.forEach((doc) => {
        arr.push(doc.data());
      });
      setUsers(arr);
    } catch (err) {
      setError(true);
    }
  };



  return (
    <Layout>
      <Aside 
        title={'Chats'}
      >
      <div className="container">
        <SearchInput
          onEnterClick={onEnterHandler}
          placeholder="Chats, messages and more"
        />
      </div>
      <Chats
        chats={chats}
        loading={loading}
        users={undefined}
        onUserSelect={handleSelect}
      />
      </Aside>
      <Chat />
    </Layout>
  );
};

export default ChatPage;

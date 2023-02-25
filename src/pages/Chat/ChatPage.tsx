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
  const [filteredChats, setFilteredChats] = useState<DocumentData | undefined>([]);
  const [err, setError] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const [loading, setLoading] = useState<boolean>(true);
  const [params] = useSearchParams();
  const gtChats = () => {
    setLoading(true);
    const unsub = onSnapshot(doc(db, 'chats', currentUser!.uid), async (d) => {
      if (d && d.data()) {
        const data = d.data();
        if (data) {
          setChats(data.chats);
          setFilteredChats(data.chats);
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
  const onSearchHandler = async (val: string) => {
    setSearchValue(val);
    setLoading(true)
    setFilteredChats([])
    const users = []
    const usersInChat = chats!.map(chat => chat.memberId)
    const querySnapshot = await getDocs(query(collection(db, "users"), where('uid', 'in', usersInChat)));    
    querySnapshot.forEach((doc) => {
      users.push(doc.data())
    });
    
    if (val === '') {
        setFilteredChats(chats);
        setLoading(false);
    } else {
        const filtered = chats!.filter(chat => {
          const user = users.find(user => user.uid === chat.memberId)
          console.log(user);
          
          if (!user) return false;
          return (user.displayName && user.displayName.toLowerCase().includes(val.toLowerCase())) ||
         (chat.lastMessage && chat.lastMessage.toLowerCase().includes(val.toLowerCase()))
        })
        setFilteredChats(filtered);
        setLoading(false);
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
    }
    const newChat = await getChat(currentUser!.uid, user.uid);
    dispatch({ type: ActionType.ChangeUser, payload: {
      user: user.uid,
      uid: newChat[0]!.id
    } });
  };





  return (
    <Layout>
      <Aside 
        title={'Chats'}
      >
      <div className="container">
        <SearchInput
          onChange={onSearchHandler}
          placeholder="Chats, messages and more"
          value={searchValue}
        />
      </div>
      <Chats
        chats={filteredChats}
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

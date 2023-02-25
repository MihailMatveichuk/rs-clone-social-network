import { useContext, useEffect, useState } from 'react';
import UserInfo from '../../components/Main/UserInfo';
import Layout from '../Layout';
import { AuthContext } from '../../context/AuthContext';
import Aside from '../../components/Aside';
import SearchInput from '../../components/UI/SearchInput';
import Chats from '../../components/Chats';
import { ChatContext } from '../../context/Chatcontext';
import { collection, doc, DocumentData, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';
import { ActionType, authUser } from '../../types';
import { createChat, getChat } from '../../api';
import { createSearchParams, useNavigate } from 'react-router-dom';

const MainPage = () => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate()
  const { dispatch } = useContext(ChatContext);
  const [users, setUsers] = useState<DocumentData | undefined>([]);
  const [chosenUser, setChosenUser] = useState<DocumentData | null>(null);
  const [err, setError] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);

  const gtChats = () => {
    setLoading(true);
    const unsub = onSnapshot(collection(db, 'users'), (querySnapshot) => {
        const ppl: DocumentData[] = [];
        querySnapshot.forEach((doc) => {
            if (doc.data().uid !== currentUser!.uid) {
                ppl.push(doc.data());
            }
        });
        setUsers(ppl)
        setLoading(false);
    });
    return () => {
      unsub();
    };
  };

  const handleSelect = async (user: authUser) => {
    setChosenUser(user)
  };

  const onEnterHandler = async () => {

  }

  const handleSendMessage = async () => {
    const chat = await getChat(currentUser!.uid, chosenUser!.uid);
    if (!chat) {
      await createChat(currentUser!.uid, chosenUser!.uid);
    }
    const newChat = await getChat(currentUser!.uid, chosenUser!.uid);        
    dispatch({ type: ActionType.ChangeUser, payload: {
        uid: newChat[0]!.id,
        user: chosenUser!.uid
    } });    
    navigate({
        pathname: "/chats",
        search: createSearchParams({
            chat: chosenUser!.uid
        }).toString()
    });
  }

  useEffect(() => {
    currentUser?.uid && gtChats();
  }, [currentUser?.uid]);

  return (
    <Layout>
    <Aside 
        title={'Users'}
      >
      <div className="container">
        <SearchInput
          onEnterClick={onEnterHandler}
          placeholder="Find user"
        />
      </div>
      <Chats
        chats={undefined}
        loading={loading}
        users={users}
        onUserSelect={handleSelect}
      />
      </Aside>
      {chosenUser && 
        <UserInfo userUid={chosenUser.uid} isMain={false} onSendMessage={handleSendMessage}/>
      }
    </Layout>
  );
};

export default MainPage;

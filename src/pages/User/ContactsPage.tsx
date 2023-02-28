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
import { createSearchParams, useNavigate } from 'react-router-dom';

const MainPage = () => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate()
  const { dispatch } = useContext(ChatContext);
  const [users, setUsers] = useState<DocumentData | undefined>([]);
  const [filteredUsers, setFilteredUsers] = useState<DocumentData | undefined>([]);

  const [chosenUser, setChosenUser] = useState<DocumentData | null>(null);
  const [err, setError] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchValue, setSearchValue] = useState('');

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
        setFilteredUsers(ppl)
        setLoading(false);
    });
    return () => {
      unsub();
    };
  };

  const handleSelect = async (user: authUser) => {
    setChosenUser(user)
  };

  const onSearchHandler = (val: string) => {
    setSearchValue(val);
    if (val === '') {
        setFilteredUsers(users)
    } else {
        const filtered = users!.filter(user => user.displayName.toLowerCase().includes(val.toLowerCase()))
        setFilteredUsers(filtered);
    }
  }

  const handleSendMessage = async () => {  
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
          onChange={onSearchHandler}
          value={searchValue}
          placeholder="Find user"
        />
      </div>
      <Chats
        chats={undefined}
        loading={loading}
        users={filteredUsers}
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

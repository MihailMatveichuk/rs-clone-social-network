import React, { useContext } from 'react';
import Aside from '../../components/Aside';
import Chat from '../../components/Chat';
import UserInfo from '../../components/Main/UserInfo';
import Layout from '../Layout';
import { AuthContext } from '../../context/AuthContext';

const MainPage = () => {
  const {currentUser} = useContext(AuthContext)
  return (
    <Layout>
      {/* <Aside /> */}
      <UserInfo userUid={currentUser!.uid} isMain={true}/>
    </Layout>
  );
};

export default MainPage;

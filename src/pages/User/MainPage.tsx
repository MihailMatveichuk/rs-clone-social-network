import { useContext } from 'react';
import UserInfo from '../../components/Main/UserInfo';
import Layout from '../Layout';
import { AuthContext } from '../../context/AuthContext';

const MainPage = () => {
  const {currentUser} = useContext(AuthContext)
  return (
    <Layout>
      <UserInfo userUid={currentUser!.uid} isMain/>
    </Layout>
  );
};

export default MainPage;

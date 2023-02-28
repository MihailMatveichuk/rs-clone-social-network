import React, { PropsWithChildren } from 'react';
import Leftsidebar from '../components/Leftsidebar/Leftsidebar';

const Home: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="home">
      <Leftsidebar />
      {children}
    </div>
  );
};

export default Home;

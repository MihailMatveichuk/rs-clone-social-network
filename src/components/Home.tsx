import React from 'react';
import SideBar from './SideBar';
import '../App.css';

import Chat from './Chat';
import Leftsidebar from './Leftsidebar/Leftsidebar';

const Home = () => {
  return (
    <div className="home">
      <div className="home__content">
        <Leftsidebar />
        <SideBar />
        <Chat />
      </div>
    </div>
  );
};

export default Home;

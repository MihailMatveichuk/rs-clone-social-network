import React from 'react';
import SideBar from './SideBar';
import '../App.css';
import Chats from './Chats';

const Home = () => {
  return (
    <div className="home">
      <div className="container">
        <SideBar />
        <Chats />
      </div>
    </div>
  );
};

export default Home;

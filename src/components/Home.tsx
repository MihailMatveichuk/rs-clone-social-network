import React from 'react';
import SideBar from './SideBar';
import '../App.css';
import './Leftbar/Leftbar.scss';
import Chat from './Chat';
import LeftBar from './Leftbar/LeftBar';
import Chats from './Chats';

const Home = () => {
  return (
    <div className="home">
      <div className="content">
        <LeftBar />
        <SideBar />
        <Chats />
      </div>
    </div>
  );
};

export default Home;

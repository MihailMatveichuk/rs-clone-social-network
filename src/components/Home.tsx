import React from 'react';
import Aside from './Aside';
import '../App.css';

import Chat from './Chat';
import Leftsidebar from './Leftsidebar/Leftsidebar';

const Home = () => {
  return (
    <div className="home">
      <Leftsidebar />
      <Aside />
      <Chat />
    </div>
  );
};

export default Home;

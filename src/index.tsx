import { App } from './App';
import { createRoot } from 'react-dom/client';
import React from 'react';
import { AuthContextProvider } from './context/AuthContext';
import { ChatContextProvider } from './context/Chatcontext';
//require('dotenv').config() 

const rootElement = document.getElementById('root');

const root = createRoot(rootElement!);

root.render(
  <AuthContextProvider>
    <ChatContextProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ChatContextProvider>
  </AuthContextProvider>
);

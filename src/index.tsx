import { App } from './App';
import { createRoot } from 'react-dom/client';
import React from 'react';
import { AuthContextProvider } from './context/AuthContext';

const rootElement = document.getElementById('root');

const root = createRoot(rootElement!);

root.render(
  <AuthContextProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </AuthContextProvider>
);

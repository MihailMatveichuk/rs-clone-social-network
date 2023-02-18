import './assets/styles/style.scss';
import { OnBoarding } from './pages/OnBoarding';
import Error from './pages/Error';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import ChatPage from './pages/Chat/ChatPage';
import { PropsWithChildren, useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import { AuthEmail, AuthPhone } from './pages/Auth';
import Launcher from './pages/Launcher';
import Register from './components/Register';
import MainPage from './pages/User/MainPage';

export function App() {
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser);
  const ProtectedRoute: React.FC<PropsWithChildren> = ({ children }) => {
    if (currentUser === undefined) {
      return <Launcher />;
    }
    if (currentUser === null) {
      return <Navigate to="/auth" />;
    }
    return <>{children}</>;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route
            index
            element={
              <ProtectedRoute>
                <MainPage />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path="/chats">
          <Route
            index
            element={
              <ProtectedRoute>
                <ChatPage />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path="auth" element={<OnBoarding />} />
        <Route path="auth/email" element={<AuthEmail />} />
        <Route path="auth/phone" element={<AuthPhone />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

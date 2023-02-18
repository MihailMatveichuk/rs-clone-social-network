import './assets/styles/style.scss';
import { OnBoarding } from './pages/OnBoarding';
import Error from './pages/Error';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import ChatPage from './pages/Chat/ChatPage';
import { PropsWithChildren, useContext, useEffect } from 'react';
import { AuthContext } from './context/AuthContext';
import { AuthEmail, AuthPhone } from './pages/Auth';
import Launcher from './pages/Launcher';
import Register from './components/Register';
import MainPage from './pages/User/MainPage';
import SettingsPage from './pages/Settings';
import { Themes, changeTheme } from './utlis/theme';

export function App() {
  const { currentUser } = useContext(AuthContext);
  const ProtectedRoute: React.FC<PropsWithChildren> = ({ children }) => {
    if (currentUser === undefined) {
      return <Launcher />;
    }
    if (currentUser === null) {
      return <Navigate to="/auth" />;
    }
    return <>{children}</>;
  };

  useEffect(() => {
    const theme = window.sessionStorage.getItem('theme');
    if (theme && theme !== Themes.LIGHT) {
      changeTheme(theme as Themes);
    }
  }, []);

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
        <Route path="/settings">
          <Route
            index
            element={
              <ProtectedRoute>
                <SettingsPage />
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

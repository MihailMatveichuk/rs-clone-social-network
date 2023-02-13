import './assets/styles/style.scss';
import { OnBoarding } from './pages/OnBoarding';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import Home from './components/Home';
import { PropsWithChildren, useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import { AuthEmail, AuthPhone } from './pages/Auth';

export function App() {
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser);
  const ProtectedRoute: React.FC<PropsWithChildren> = ({ children }) => {
    if (currentUser === undefined) {
      return <div>Loading...</div>;
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
                <Home />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path="auth" element={<OnBoarding />} />
        <Route path="auth/email" element={<AuthEmail />} />
        <Route path="auth/phone" element={<AuthPhone />} />
      </Routes>
    </BrowserRouter>
  );
}

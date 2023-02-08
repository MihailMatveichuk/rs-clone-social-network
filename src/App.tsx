import './assets/styles/style.scss';
import { OnBoarding } from './pages/OnBoarding';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Home from './components/Home';
import Login from './components/Login';
import { PropsWithChildren, useContext } from 'react';
import { AuthContext } from './context/AuthContext';

export function App() {
  const { currentUser } = useContext(AuthContext);

  const ProtectedRoute = ({ children }: PropsWithChildren) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  return (
    <BrowserRouter>
{/*
      <OnBoarding /> */}
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
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

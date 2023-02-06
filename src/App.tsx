import './assets/styles/style.scss';
import { OnBoarding } from './pages/OnBoarding';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Home from './components/Home';
import Login from './components/Login';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';

export const App = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <BrowserRouter>
      {/* <OnBoarding /> */}
      <Routes>
        <Route path="/">
          <Route index element={!currentUser ? <OnBoarding /> : <Home />} />
          <Route
            path="login"
            element={currentUser ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="register"
            element={currentUser ? <Navigate to="/" /> : <Register />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

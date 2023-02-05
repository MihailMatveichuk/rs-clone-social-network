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
  console.log(currentUser);
  return (
    <BrowserRouter>
      <OnBoarding />
      <Routes>
        <Route path="/">
          <Route
            index
            element={currentUser ? <Home /> : <Navigate to="/login" />}
          />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

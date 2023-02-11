import '../App.css';
import styled from 'styled-components';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  browserSessionPersistence,
  signInWithEmailAndPassword,
  setPersistence,
} from 'firebase/auth';
import auth from '../firebase';
import Header from './Header';

export const Button = styled.button`
  background-color: rgba(144, 172, 172, 0.582);
  padding: 10px;
  border: none;
  width: 82px;
  height: 40px;
  color: white;
  font-family: 'SF Pro Text';
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  color: #ffffff;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.5s;
  :hover {
    background-color: rgba(41, 97, 186, 0.751);
  }
`;

const Login = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: {
    target: any;
    preventDefault: () => void;
  }) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    try {
      await setPersistence(auth, browserSessionPersistence);
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (err) {
      setErr(true);
    }
  };
  return (
    <div className="form-container">
      <Header />
      <div className="form-wrapper">
        <span className="logo">Chat</span>
        <span className="title">Login</span>
        <form className="registra-form" onSubmit={handleSubmit}>
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />
          <Button>Sign in</Button>
          {err && <span>Something went wrong</span>}
        </form>
        <p>
          You don`t have an account? <Link to={'/register'}>Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

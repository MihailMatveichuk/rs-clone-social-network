import '../App.css';
import Header from './Header';
import InputFile from './InputFile';
import styled from 'styled-components';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db, storage } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { useState } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';

const Button = styled.button`
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
  background: #248bf2;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
`;

const Register = () => {
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e: {
    target: any;
    preventDefault: () => void;
  }) => {
    e.preventDefault();
    const file = e.target[0].files[0];
    const displayName: string = e.target[1].value;
    const email: string = e.target[2].value;
    const password: string = e.target[3].value;

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const storageRef = ref(storage, displayName);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, 'users', res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            await setDoc(doc(db, 'userChats', res.user.uid), {});
            navigate('/');
          } catch (err) {
            console.log(err);
            setError(true);
          }
        });
      });
    } catch (err) {
      setError(true);
    }
  };
  return (
    <div className="form-container">
      <Header />
      <div className="form-wrapper">
        <span className="logo">New account</span>
        <span className="title">Introduce yourself</span>
        <form className="registra-form" onSubmit={handleSubmit}>
          <InputFile />
          <input type="text" placeholder="First name" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <Button>Sign up</Button>
          {error && <span style={{ color: 'red' }}>This user is existed</span>}
        </form>
        <p>
          You do have an account? <Link to={'/login'}>Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;

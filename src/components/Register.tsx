import '../App.css';
import InputFile from './InputFile';
import styled from 'styled-components';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db, storage } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

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
  const navigate = useNavigate();
  const [error, setError] = useState(false);

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

      await uploadBytesResumable(storageRef, file).then(async () => {
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
            navigate('/');
            await setDoc(doc(db, 'userChats', res.user.uid), {});
          } catch (err) {
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
      <div className="form-wrapper">
        <span className="logo">New account</span>
        <span className="title">Introduce yourself</span>
        <form className="registra-form" onSubmit={handleSubmit}>
          <InputFile />
          <input type="text" placeholder="First name" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <Button>Sign up</Button>
        </form>
        <p>{error ? 'Email is wrong' : null}</p>
      </div>
    </div>
  );
};

export default Register;

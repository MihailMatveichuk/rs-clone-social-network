import '../App.css';
import InputFile from './InputFile';
import styled from 'styled-components';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db, storage } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { doc, setDoc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { checkUser } from '../api';

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
  const { currentUser } = useContext(AuthContext);
  const handleSubmit = async (e: {
    target: any;
    preventDefault: () => void;
  }) => {
    e.preventDefault();
    const file = e.target[0].files[0];
    const firstName: string = e.target[1].value;
    const lastName: string = e.target[2].value;

    try {
      const displayName = `${firstName} ${lastName}`
      //const res = await createUserWithEmailAndPassword(auth, email, password);
      const storageRef = ref(storage, displayName);

      await uploadBytesResumable(storageRef, file).then(async () => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            await updateProfile(currentUser!, {
              displayName,
              photoURL: downloadURL,
            });
            const user = await checkUser(currentUser!.uid);
            console.log(user);
            await updateDoc(doc(db, 'users', user!.uid), {
              ...user,
              displayName,
              photoUrl: downloadURL,
            });
            navigate('/');
            //await setDoc(doc(db, 'userChats', res.user.uid), {});
          } catch (err) {
            console.log(err);
            
           // setError(true);
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
          <input type="text" placeholder="Last Name" />
          <Button>Sign up</Button>
        </form>
        <p>{error ? 'Email is wrong' : null}</p>
      </div>
    </div>
  );
};

export default Register;

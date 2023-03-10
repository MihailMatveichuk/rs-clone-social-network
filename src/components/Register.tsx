import InputFile from './InputFile';
import { updateProfile } from 'firebase/auth';
import { db, storage } from '../firebase';
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  getBlob,
} from 'firebase/storage';
import { doc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { checkUser } from '../api';
const logoSrc = require('../assets/images/Avatar.png');

const Register = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const [image, setImage] = useState<string | ArrayBuffer>(logoSrc);
  const handleSubmit = async (e: {
    target: any;
    preventDefault: () => void;
  }) => {
    e.preventDefault();
    const defaultImage = await getDownloadURL(ref(storage, 'logo.png'));
    const file = e.target[0].files[0];
    const firstName: string = e.target[1].value;
    const lastName: string = e.target[2].value;

    try {
      const displayName = `${firstName} ${lastName}`;
      const storageRef = ref(storage, currentUser!.uid);
      if (file) {
        await uploadBytesResumable(storageRef, file).then(async () => {
          getDownloadURL(storageRef).then(async (downloadURL) => {
            try {
              await updateProfile(currentUser!, {
                displayName,
                photoURL: downloadURL,
              });
              const user = await checkUser(currentUser!.uid);
              await updateDoc(doc(db, 'users', user!.uid), {
                ...user,
                displayName,
                photoURL: downloadURL,
              });
              navigate('/');
            } catch (err) {
              console.log(err);
              // setError(true);
            }
          });
        });
      } else {
        try {
          await updateProfile(currentUser!, {
            displayName,
            photoURL: defaultImage,
          });
          const user = await checkUser(currentUser!.uid);
          await updateDoc(doc(db, 'users', user!.uid), {
            ...user,
            displayName,
            photoURL: defaultImage,
          });
          navigate('/');
        } catch (err) {
          console.log(err);
          // setError(true);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="form-container">
      <div className="form-wrapper">
        <span className="title">Introduce yourself</span>
        <form className="registra-form" onSubmit={handleSubmit}>
          <InputFile
            src={image}
            onChange={(image: string | ArrayBuffer) => setImage(image)}
          />
          <input type="text" placeholder="First name" required />
          <input type="text" placeholder="Last Name" required />
          <button className="btn btn--primary">Go</button>
        </form>
      </div>
    </div>
  );
};

export default Register;

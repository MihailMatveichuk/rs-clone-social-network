import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_API_KEY,
//   authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_MESSAGE_SENDER_ID,
//   appId: process.env.REACT_APP_APP_ID,
// };

const firebaseConfig = {
  apiKey: "AIzaSyD6PUtnmbH_fovZuwQUAfz0nzbZ4sULv_E",
  authDomain: "chat-local-9eadd.firebaseapp.com",
  databaseURL: "https://chat-local-9eadd-default-rtdb.firebaseio.com",
  projectId: "chat-local-9eadd",
  storageBucket: "chat-local-9eadd.appspot.com",
  messagingSenderId: "15271697589",
  appId: "1:15271697589:web:e95a3b3adc2e47080af2fc",
  measurementId: "G-TX164T1DNG"
};
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore(app);

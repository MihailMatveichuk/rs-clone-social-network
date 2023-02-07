import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyC0hvTZNTZZnSsIwbQM2T0Vpa9CCGnWs2M',
  authDomain: 'chat-react-4f45d.firebaseapp.com',
  projectId: 'chat-react-4f45d',
  storageBucket: 'chat-react-4f45d.appspot.com',
  messagingSenderId: '511838292500',
  appId: '1:511838292500:web:b33ba73ff3b97794c4f501',
};

// Initialize Firebase

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();

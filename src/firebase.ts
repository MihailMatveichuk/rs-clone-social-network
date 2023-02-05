import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDuBOLqhKjpp55463UHvDPc7KnA46dza3Y',
  authDomain: 'rs-chat-da1ad.firebaseapp.com',
  projectId: 'rs-chat-da1ad',
  storageBucket: 'rs-chat-da1ad.appspot.com',
  messagingSenderId: '712962934357',
  appId: '1:712962934357:web:3032efae27e345b32e76dc',
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();

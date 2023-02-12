import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
//import * as dotenv from 'dotenv';
//dotenv.config();
// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: 'AIzaSyADJ4V9JyV9dgcaXLBe45okZ9qKNyisnPs',
//   authDomain: 'rs-chat-9d2b3.firebaseapp.com',
//   projectId: 'rs-chat-9d2b3',
//   storageBucket: 'rs-chat-9d2b3.appspot.com',
//   messagingSenderId: '794508097033',
//   appId: '1:794508097033:web:534101952cde4972f0aad8',
// };
const firebaseConfig = {
//  apiKey: "AIzaSyDuBOLqhKjpp55463UHvDPc7KnA46dza3Y",
  // authDomain: "rs-chat-da1ad.firebaseapp.com",
  // databaseURL: "https://rs-chat-da1ad-default-rtdb.europe-west1.firebasedatabase.app",
 //  projectId: "rs-chat-da1ad",
  // storageBucket: "rs-chat-da1ad.appspot.com",
  // messagingSenderId: "712962934357",
  // appId: "1:712962934357:web:3032efae27e345b32e76dc"
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGE_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};
// Initialize Firebase

export const app = initializeApp(firebaseConfig);
const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();

export default auth;


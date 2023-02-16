import { User } from "firebase/auth";
import { arrayUnion, collection, doc, DocumentData, getDoc, getDocs, query, setDoc, Timestamp, updateDoc, where } from "firebase/firestore";
import { db } from "../firebase";
import { uuidv4 } from '@firebase/util';

const usersRef = collection(db, "users");

const userChatsRef = collection(db, "chats");


type createUserWithEmail = {
    email: string;
    uid: string;
}

export const checkUser = async (uid: string): Promise<DocumentData | null> => {
    if (!uid) return null;
    const docRef = doc(db, "users", uid);
    const docSnap =  await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      return docSnap.data();
    } else {
      // doc.data() will be undefined in this case
      return null;
    }
}

export const createUserViaEmail = async ({email, uid}: createUserWithEmail) => {
    await setDoc(doc(usersRef, uid), {
        photoUrl:'',
        uid,
        online: true,
        email,
        phone:'',
        displayName: email
    });

    await setDoc(doc(userChatsRef, uid), {
        chats: []
    })
}

export const getChat = async (uid: string, uid2: string) => {
    const docRef = doc(db, `chats`, uid);
    const docSnap =  await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      const chats = docSnap.data().chats;
      const chat = chats.filter(chat => chat.memberId === uid2)
      return chat.length === 0 ? null : chat
    } else {
      // doc.data() will be undefined in this case
      return null;
    }
      return null;
    // if (docSnap.exists()) {
    //   console.log("Document data:", docSnap.data());
    //   return docSnap.data();
    // } else {
    //   // doc.data() will be undefined in this case
    //   return null;
    // }
}

export const createChat = async (uid: string, uid2: string) => {
    const user1 = await checkUser(uid)
    const user2 = await checkUser(uid2)
    await updateDoc(doc(db, 'chats', uid), {
        chats: arrayUnion({
          id: uuidv4(),
          text: null,
          memberId: user2!.uid,
          memberName: user2!.displayName,
          memberPhoto: user2!.photoUrl,
          date: Timestamp.now(),
          lastMessage: null,
        })
    })
    console.log(user1, user2);
}




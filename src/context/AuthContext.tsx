import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, DocumentData, getDoc } from 'firebase/firestore';
import { createContext, PropsWithChildren, useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { ContextUser } from '../types';

export const AuthContext = createContext<ContextUser>({
  currentUser: null,
});

export const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const [currentUser, setCurrentUser] = useState<User | null>();
  console.log('currentUser: ', currentUser);


  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);

        console.log('user: ', user);
      } else {
        setCurrentUser(null);
      }
    });
    return () => {
      unsub();
    };
  }, []);
  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

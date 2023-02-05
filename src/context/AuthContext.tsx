import { onAuthStateChanged, User } from 'firebase/auth';
import { createContext, PropsWithChildren, useEffect, useState } from 'react';
import { auth } from '../firebase';

export const AuthContext = createContext({});

export const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const [currentUser, setCurrentUser] = useState<User | null>();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
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

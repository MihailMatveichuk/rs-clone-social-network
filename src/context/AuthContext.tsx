import { onAuthStateChanged, User } from 'firebase/auth';
import { createContext, PropsWithChildren, useEffect, useState } from 'react';
import { auth } from '../firebase';
import { ContextUser } from '../types';

export const AuthContext = createContext<ContextUser>({
  currentUser: null,
});

export const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const [currentUser, setCurrentUser] = useState<User | null>();
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

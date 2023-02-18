import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, DocumentData, getDoc } from 'firebase/firestore';
import { createContext, PropsWithChildren, useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { ContextUser } from '../types';
import { changeTheme, Themes } from '../utlis/theme';

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
          const theme = user.theme;
          if (theme && theme !== Themes.LIGHT) {
            changeTheme(theme as Themes);
          }
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

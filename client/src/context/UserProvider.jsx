/* eslint-disable react/prop-types */
import React, { useState, useEffect, createContext } from 'react';
import { auth } from '../firebase';

export const UserContext = createContext();

export default function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userListener = auth.onAuthStateChanged(async (authUser) => {
      if (authUser) {
        const { displayName, email, photoURL, uid } = authUser;
        setUser({
          displayName,
          email,
          photoURL,
          uid,
        });
      } else {
        setUser(null);
      }
    });

    return () => {
      userListener();
    };
  }, []);

  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
}

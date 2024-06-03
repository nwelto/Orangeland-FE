import React, {
  createContext, useContext, useEffect, useMemo, useState,
} from 'react';
import firebase from 'firebase/app';
import { checkUser, registerUser } from '../auth';
import 'firebase/auth';

const AuthContext = createContext();

AuthContext.displayName = 'AuthContext';

const AuthProvider = (props) => {
  const [user, setUser] = useState(null);
  const [oAuthUser, setOAuthUser] = useState(null);

  const updateUser = useMemo(() => (uid) => {
    checkUser(uid)
      .then((gamerInfo) => {
        if (!gamerInfo || gamerInfo.length === 0) {
          if (oAuthUser) {
            const userInfo = {
              uid: oAuthUser.uid,
              email: oAuthUser.email,
              name: oAuthUser.displayName,
              isAdmin: oAuthUser.isAdmin || false,
            };
            registerUser(userInfo)
              .then((newUserInfo) => {
                setUser({ fbUser: oAuthUser, ...newUserInfo });
              })
              .catch((error) => console.error('Error registering user:', error));
          }
        } else {
          setUser({ fbUser: oAuthUser, ...gamerInfo });
        }
      })
      .catch((error) => console.error('Error checking user:', error));
  }, [oAuthUser]);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((fbUser) => {
      if (fbUser) {
        setOAuthUser(fbUser);
        updateUser(fbUser.uid);
      } else {
        setOAuthUser(false);
        setUser(false);
      }
    });
    return () => unsubscribe(); // Cleanup subscription on unmount
  }, [updateUser]);

  const value = useMemo(() => ({
    user,
    updateUser,
    userLoading: user === null || oAuthUser === null,
  }), [user, oAuthUser, updateUser]);

  return <AuthContext.Provider value={value} {...props} />;
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth, AuthContext };

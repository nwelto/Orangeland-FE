import firebase from 'firebase/app';
import 'firebase/auth';
import { clientCredentials } from './client';

const checkUser = (uid) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/checkuser/${uid}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((resp) => resolve(resp.json()))
    .catch(reject);
});

const registerUser = (userInfo) => new Promise((resolve, reject) => {
  if (!userInfo || !userInfo.uid || !userInfo.email || !userInfo.name) {
    reject(new Error('Invalid user information'));
  } else {
    fetch(`${clientCredentials.databaseURL}/user`, {
      method: 'POST',
      body: JSON.stringify(userInfo),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((resp) => resp.json())
      .then(resolve)
      .catch(() => {
        reject(new Error('Error registering user'));
      });
  }
});

const signIn = (onSuccess) => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider)
    .then((result) => {
      if (result.user) {
        onSuccess();
      }
    })
    .catch((error) => {
      console.error('Error during sign-in:', error);
    });
};

const signOut = () => {
  firebase.auth().signOut();
};

export {
  signIn,
  signOut,
  checkUser,
  registerUser,
};

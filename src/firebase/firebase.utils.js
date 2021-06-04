import firebase from "firebase/app";

import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyB1c6uxUQG8ygrYMt0yvM00qTrxwcp8zFs",
  authDomain: "crwn-db-b884f.firebaseapp.com",
  projectId: "crwn-db-b884f",
  storageBucket: "crwn-db-b884f.appspot.com",
  messagingSenderId: "129880486507",
  appId: "1:129880486507:web:614fc248a6dcf3a332b72e",
  measurementId: "G-FGG75YRJTT"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();
  if (!snapShot.exists) {
    const {displayName, email} = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName, email, createdAt, ...additionalData
      })
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;

}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({"prompt": "select_account"});
export const signInWithGoole = () => auth.signInWithPopup(provider);

export default firebase;

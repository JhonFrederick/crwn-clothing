import { initializeApp } from "firebase/app";
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {getFirestore, doc, getDoc, setDoc} from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDpRA2ld3tiGqx8Puvg9xklg6wduulyIZc",
  authDomain: "crwn-clothing-db-45f19.firebaseapp.com",
  projectId: "crwn-clothing-db-45f19",
  storageBucket: "crwn-clothing-db-45f19.appspot.com",
  messagingSenderId: "1085559907552",
  appId: "1:1085559907552:web:372739eced8ccb01d5dc85"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if(!userSnapshot.exists()){
    const {displayName, email} = userAuth;
    const createdAt = new Date();

    try{
      await setDoc(userDocRef,
        {displayName, email, createdAt
        });
    }catch (error){
      console.log("Error creating the user", error.message);
    }
  }
  return userDocRef;

}
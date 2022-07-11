import {initializeApp} from "firebase/app";
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword
} from "firebase/auth";
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

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
    if (!userAuth) return;
    const userDocRef = doc(db, "users", userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef,
                {
                    displayName, email, createdAt,
                    ...additionalInformation
                });
        } catch (error) {
            console.log("Error creating the user", error.message);
        }
    }
    return userDocRef;

}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password);
}
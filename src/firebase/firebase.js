import firebase from "firebase/app";
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, setDoc, query, where, getDocs, collection } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDF6tXpbjjYxmBH3WEhuPMlH1Edkq7NSW4",
    authDomain: "mini-project-9e6c8.firebaseapp.com",
    projectId: "mini-project-9e6c8",
    storageBucket: "mini-project-9e6c8.appspot.com",
    messagingSenderId: "639376609221",
    appId: "1:639376609221:web:9614445f4e2d90bb7ec5ac",
    measurementId: "G-V6MBESNJL6"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export const addUserToFirestore = async (user) => {
    // Reference to the "users" collection
    const usersCollection = collection(db, 'users');

    // Check if a document with the user's email already exists
    const q = query(usersCollection, where('email', '==', user.email));
    const querySnapshot = await getDocs(q);

    // If no documents match the query, add the user
    if (querySnapshot.empty) {
        // Create a new document with the user's UID as the document ID
        await setDoc(doc(usersCollection, user.uid), {
            email: user.email,
            displayName: user.displayName,
        });
        console.log('User added to Firestore');
    } else {
        console.log('User with the same email already exists');
    }
};


onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, so add their information to Firestore
        addUserToFirestore(user.uid, user.email, user.displayName)
            .then(() => {
                console.log('Successful User Query');
            })
            .catch((error) => {
                console.error('Error adding user to Firestore:', error);
            });
    } else {
        // User is signed out
        console.log('User signed out');
    }
});





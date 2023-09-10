import firebase from "firebase/app";
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

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
export const firestore = getFirestore(app);





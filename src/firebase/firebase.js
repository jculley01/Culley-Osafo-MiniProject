// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "@firebase/firestore"
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDF6tXpbjjYxmBH3WEhuPMlH1Edkq7NSW4",
    authDomain: "mini-project-9e6c8.firebaseapp.com",
    projectId: "mini-project-9e6c8",
    storageBucket: "mini-project-9e6c8.appspot.com",
    messagingSenderId: "639376609221",
    appId: "1:639376609221:web:9614445f4e2d90bb7ec5ac",
    measurementId: "G-V6MBESNJL6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const firestore = getFirestore(app)

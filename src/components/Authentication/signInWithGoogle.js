import React from 'react';
import firebase from 'firebase/app'; // Import Firebase
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

function SignInWithGoogle() {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    const handleSignIn = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                // IdP data available using getAdditionalUserInfo(result)
                // ...
            }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
    }

    return (
        <button onClick={handleSignIn}>Sign in with Google</button>
    );
}

export default SignInWithGoogle;



import React from 'react';
import { auth, provider } from '../../firebase/firebase'; // Import Firebase

function SignInWithGoogle() {
    const handleSignIn = () => {
        auth.signInWithPopup(provider)
            .then((result) => {
                // Handle successful sign-in
                console.log('User signed in:', result.user);
            })
            .catch((error) => {
                // Handle sign-in error
                console.error('Google sign-in error:', error);
            });
    }

    return (
        <button onClick={handleSignIn}>Sign in with Google</button>
    );
}

export default SignInWithGoogle;

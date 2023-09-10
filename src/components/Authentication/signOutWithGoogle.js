import React from 'react';
import { getAuth, signOut } from 'firebase/auth';

const SignOutButton = () => {
    const handleSignOut = () => {
        const auth = getAuth();
        signOut(auth)
            .then(() => {
                // Sign-out successful.
                console.log('Sign-out successful.');
            })
            .catch((error) => {
                // An error happened.
                console.error('Error during sign-out:', error);
            });
    };

    return (
        <button onClick={handleSignOut}>Sign Out</button>
    );
};

export default SignOutButton;

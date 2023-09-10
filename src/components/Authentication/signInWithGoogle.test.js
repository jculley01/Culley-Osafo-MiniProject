import React from 'react';
import { render, screen } from '@testing-library/react';
import SignInWithGoogle from './SignInWithGoogle';

test('renders the "Sign in with Google" button', () => {
    const { getByText } = render(<SignInWithGoogle />);
    const signInButton = getByText('Sign in with Google');
    expect(signInButton).toBeInTheDocument();
});

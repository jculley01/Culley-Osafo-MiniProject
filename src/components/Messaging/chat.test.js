import React from 'react';
import { render } from '@testing-library/react';
import Chat from './Chat';

test('renders the message input and send button', () => {
    const { getByPlaceholderText, getByText } = render(<Chat />);
    const messageInput = getByPlaceholderText('Type your message...');
    const sendButton = getByText('Send');
    expect(messageInput).toBeInTheDocument();
    expect(sendButton).toBeInTheDocument();
});

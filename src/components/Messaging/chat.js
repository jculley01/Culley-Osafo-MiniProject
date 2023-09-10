import React, { useState } from 'react';
import { firestore } from '../../firebase/firebase'; // Import Firebase

function Chat({ senderId, receiverId }) {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const handleSendMessage = async () => {
        try {
            await firestore.collection('messages').add({
                senderId,
                receiverId,
                message,
                timestamp: new Date(),
            });
            setMessage('');
        } catch (error) {
            console.error('Message sending error:', error);
        }
    }

    return (
        <div>
            <div>
                {messages.map((msg) => (
                    <div key={msg.id}>
                        <span>{msg.senderId}: </span>
                        <span>{msg.message}</span>
                    </div>
                ))}
            </div>
            <input
                type="text"
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={handleSendMessage}>Send</button>
        </div>
    );
}

export default Chat;

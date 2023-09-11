// src/components/Chatroom.js
import React, { useState } from 'react';
import { getFirestore } from 'firebase/firestore';

const ChatRoom = () => {
    const db = getFirestore();
    const [chatRoom, makeChatRoom] = useState('');


    const createChatroom = async () => {
        /*const chatroomRef = await db.collection('chatrooms').add({
            name: chatroomName,
        });
        setChatroomId(chatroomRef.id);*/
        console.log('TEST: Chatroom has been created');
    };
    createChatroom();

    return (
        <button onClick={createChatroom}>Add Users to Chatroom</button>
    );
};

export default ChatRoom;

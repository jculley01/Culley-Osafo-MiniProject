// src/components/Chatroom.js
import React, { useState } from 'react';
import {getFirestore, addDoc, collection, getDocs, query, getAuth, where, limit} from 'firebase/firestore';

const ChatRoom = ({ selectedUsers }) => {
    const db = getFirestore();

    const createChatroom = async () => {
        /*const [chatRoomName, setChatRoomName] = useState('');*/
        const chatroomCollection = collection(db, 'chatrooms');

        const q = query(
            chatroomCollection,

            where('users', 'in', [[selectedUsers]] ),

            limit(10)
        );
        const querySnapshot = await getDocs(q);

        try {
            if (querySnapshot.empty || selectedUsers != []) {
                await addDoc(collection(db, 'chatroom'), {
                    timestamp: new Date(),
                    users: selectedUsers,
                });
            }
        } catch (error) {
            console.error('Error creating chatroom:', error);
        }

        console.log('TEST: Chatroom has been created');
    };
    createChatroom();

    return (
        <button onClick={createChatroom}>Add Users to Chatroom</button>
    );
};

export default ChatRoom;

// src/components/Chatroom.js
import React, { useState } from 'react';
import {getFirestore, addDoc, collection, getDocs, query, getAuth, where, limit, doc, updateDoc, setDoc} from 'firebase/firestore';

const ChatRoom = ({ selectedUsers }) => {
    const db = getFirestore();

    const createChatroom = async () => {
        /*const [chatRoomName, setChatRoomName] = useState('');*/
        const chatroomCollection = collection(db, 'chatrooms');
        const q = query(
            chatroomCollection,

            where('users', 'array-contains', selectedUsers),

            limit(10)
        );
        const querySnapshot = await getDocs(q);

        try {
            if (querySnapshot.empty && selectedUsers[0] !== undefined) {
                const chatRoomRef = doc(collection(db, 'chatroom'));

                await setDoc(chatRoomRef, {
                    timestamp: new Date(),
                    users: selectedUsers[0].label,
                });
                let a = 1;

                while (selectedUsers[a] !== undefined) {
                    await updateDoc(chatRoomRef, {
                        users: selectedUsers[a].label,
                    });
                    a = a + 1;
                }
                console.log('Printing value:', selectedUsers[0].label);
                console.log('TEST: Chatroom has been created');

            } else {
                console.log('No selected user');
            }
        } catch (error) {
            console.error('Error creating chatroom:', error);
        }


    };
    /*createChatroom();*/

    return (
        <button onClick={createChatroom}>Add Users to Chatroom</button>
    );
};

export default ChatRoom;

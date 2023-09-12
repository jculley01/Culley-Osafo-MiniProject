// src/components/Chatroom.js
import React, { useState } from 'react';
import { getAuth } from 'firebase/auth';
import { auth } from "../../firebase/firebase.js"
import {getFirestore, addDoc, collection, getDocs, query, where, limit, doc, updateDoc, setDoc, arrayUnion} from 'firebase/firestore';
import {useAuthState} from "react-firebase-hooks/auth";

const ChatRoom = ({ selectedUsers }) => {
    const db = getFirestore();
    const [user] = useAuthState(auth);


    const createChatroom = async () => {
        /*const [chatRoomName, setChatRoomName] = useState('');*/
        const chatroomCollection = collection(db, 'chatrooms');
        const userCollection = collection(db, 'users');

        const q = query(
            chatroomCollection,

            where('users', 'array-contains', selectedUsers),

            limit(10)
        );
        const querySnapshot = await getDocs(q);

        try {
            console.log(user.uid);
            if (querySnapshot.empty && selectedUsers[0] !== undefined) {
                const chatRoomRef = await addDoc(collection(db, 'chatroom'), {
                    timestamp: new Date(),
                    users: [selectedUsers[0].label],
                });


                let a = 1;

                while (selectedUsers[a] !== undefined) {
                    await updateDoc(chatRoomRef, {
                        users: arrayUnion(selectedUsers[a].label),
                    });
                    a = a + 1;
                }
                //Add current user to chatroom
                const currentUser = doc(userCollection, user.uid);
                console.log(currentUser)


                await updateDoc(chatRoomRef, {
                    users: arrayUnion(currentUser.displayName),
                });

                console.log('Printing value:', selectedUsers);
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

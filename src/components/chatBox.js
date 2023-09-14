import React, { useEffect, useRef, useState } from "react";
import {
    query,
    collection,
    orderBy,
    onSnapshot,
    limit, doc, setDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import Message from "./message";
import SendMessage from "./sendMessage";

const ChatBox = (collectionReference) => {
    const [messages, setMessages] = useState([]);
    const scroll = useRef();

    useEffect(() => {
        // Make sure collectionReference is available before proceeding
        if (collectionReference) {
            console.log("CoolectionReff: ",collectionReference);
            const myCollec = collection(db, collectionReference);

            const q = query(
                myCollec,
                orderBy("createdAt", "desc"),
                limit(50)
            );

            const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
                const fetchedMessages = [];
                QuerySnapshot.forEach((doc) => {
                    fetchedMessages.push({ ...doc.data(), id: doc.id });
                });
                const sortedMessages = fetchedMessages.sort(
                    (a, b) => a.createdAt - b.createdAt
                );
                setMessages(sortedMessages);
            });

            // Add an initial document to the collection if it doesn't exist
            const initialDocRef = doc(db, collectionReference, 'initialDocument');
            setDoc(initialDocRef, { /* Your initial data */ }, { merge: true })
                .then(() => {
                    console.log('Initial document added or updated successfully.');
                })
                .catch((error) => {
                    console.error('Error adding initial document:', error);
                });

            return () => unsubscribe;
        }
    }, [collectionReference]);

    return (
        <main className="chat-box">
            <div className="messages-wrapper">
                {messages?.map((message) => (
                    <Message key={message.id} message={message} />
                ))}
            </div>
            {/* when a new message enters the chat, the screen scrolls down to the scroll div */}
            <span ref={scroll}></span>
            <SendMessage scroll={scroll} />
        </main>
    );
};

export default ChatBox;
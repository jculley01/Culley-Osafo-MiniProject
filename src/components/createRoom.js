import { useSelectedUser } from './selectedUserContext';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import ChatBox from "./chatBox";
import {getFirestore, collection, getDocs, doc, setDoc, serverTimestamp} from 'firebase/firestore';
import Search from "./search";
import {sUser} from "./search";

function CreateRoom({user}) {
    const db = getFirestore();
    const auth = getAuth();
    const { selectedUser = {email: "defaultTest", displayName: "Testing"} } = sUser;

    // Function to generate a unique ID based on displayNames
    const generateUniqueID = (user, selectedUser) => {
        console.log("User: ",user);
        console.log("SelectedUser: ", selectedUser);
        const bothNames = [user.displayName, selectedUser.displayName];
        bothNames.sort();
        const combinedNames = bothNames.join(''); // Concatenate the names without any separator
        return combinedNames;
    };

    // Function to create a Firestore collection reference based on names
    const createCollectionReference = (user, selectedUser) => {
        console.log("createRoom2");
        const collectionName = generateUniqueID(user, selectedUser);
        const collectionPath = `chat/chatIDs/${collectionName}`; // Define the entire path here
        const collectionRef = collection(db, collectionPath);
        return collectionRef;
    };

    // Function to initialize the collection
    const initializeCollection = async (user, selectedUser) => {
        const collectionRef = createCollectionReference(user, selectedUser);
        console.log("celasdlkf: ", collectionRef);
        try {
            // Attempt to fetch the first document in the collection
            const querySnapshot = await getDocs(collectionRef);

            // If the collection is empty, add an initial document to it
            if (querySnapshot.empty) {
                const initialData = {
                    text: "testing testing",
                    name: "John Smith",
                    createdAt: serverTimestamp(),
                };
                const initialDocRef = doc(collectionRef, 'initialDocument');
                await setDoc(initialDocRef, initialData);
                console.log('Collection created successfully.');
            } else {
                console.log('Collection already exists.');
            }
        } catch (error) {
            console.error('Error initializing the collection:', error);
        }
    };



    useEffect(() => {
        if (user && selectedUser) {
            initializeCollection(user, selectedUser);
        }
    }, [user, selectedUser]);

    return (
        <div>
            <Search />
            {sUser && (
                <ChatBox collectionReference={createCollectionReference(user, selectedUser)} />
            )}
        </div>
    );
}

export default CreateRoom;

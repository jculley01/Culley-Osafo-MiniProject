import React, { useState, useEffect } from 'react';
import {collection, query, where, orderBy, limit, getDocs, getFirestore, or} from 'firebase/firestore';
import Select from 'react-select'; // Import react-select
import ChatRoom from "../Chats/chatRoom";
function UserSearch({ firestore }) {
    const db = getFirestore();
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    useEffect(() => {
        if (searchTerm.trim() === '') {
            setSearchResults([]); // Clear results if the search term is empty
            return;
        }
        const getUsers = async () => {
            // Reference to the "users" collection
            const usersCollection = collection(db, 'users');
            // Query Firestore for users matching the search term
            const q = query(
                usersCollection,

                or(where('displayName', '==', searchTerm ),


                where('email', '==', searchTerm)),

                orderBy('displayName'),
                limit(10)
            )


            try {
                const querySnapshot = await getDocs(q);

                const results = [];
                querySnapshot.forEach((doc) => {
                    results.push({ value: doc.id, label: doc.data().displayName }); // Format data for react-select
                });
                setSearchResults(results);
            } catch (error) {
                console.error('Error searching for users:', error);
            }
        };
        getUsers();
    }, [searchTerm, firestore]);

    const addUsersToChatroom = (selectedUsers) => { //UNUSED
        // Trigger the search when the user clicks the search button
        // You can also update the results as the user types without this button
        const chat = ChatRoom();
        console.log('Button pressed');
    };
    const handleUserSelect = (selectedOptions) => {
        setSelectedUsers(selectedOptions);
    };
    return (
        <div>
            <input
                type="text"
                placeholder="Search for users by name or email"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <ChatRoom />
            <Select
                isMulti
                options={searchResults}
                value={selectedUsers}
                onChange={handleUserSelect}
                placeholder="Select users"
            />
        </div>
    );
}
export default UserSearch;
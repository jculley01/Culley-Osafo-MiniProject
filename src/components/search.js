import React, { useState, useEffect } from 'react';
import {collection, query, where, orderBy, limit, getDocs, getFirestore, or, onSnapshot} from 'firebase/firestore';
import { useSelectedUser } from './selectedUserContext';
let sUser = {};

function Search({ firestore }) {
    const db = getFirestore();
    const userCollection = collection(db, 'users');
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [documentsArray, setDocumentsArray] = useState([]);
    const { selectedUser, setSelectedUser } = useSelectedUser();

    useEffect(() => {
        const unsubscribe = onSnapshot(userCollection, (querySnapshot) => {
            const documents = [];
            console.log("search1");
            querySnapshot.forEach((doc) => {
                const documentData = doc.data();
                documents.push(documentData);
                console.log("search2");
            });
            console.log("search3");
            setDocumentsArray(documents);
        });
        console.log("search4");
        return () => unsubscribe();
    }, []);



    const handleSearch = (e) => {
        const searchTerm = e.target.value;
        setSearchTerm(searchTerm);
        console.log("All Users: ", documentsArray);
        // Filter the data array based on the search term
        const filteredResults = documentsArray.filter((item) =>
            item.displayName.toLowerCase().includes(searchTerm.toLowerCase())
        );
        console.log("filtered results: ", filteredResults);
        // Update the search results state
        setSearchResults(filteredResults);
    };

    const handleUserClick = (user) => {
        sUser = user;
        console.log("sUser: ", sUser);
        setSelectedUser(user); // Set the selected user when an <li> is clicked
    };


    return (
        <div>
            <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearch}
            />
            <ul>
                {searchResults.slice(0, 5).map((item) => (
                    <li
                        key={item.email}
                        onClick={() => handleUserClick(item)} // Call handleUserClick when an <li> is clicked
                        style={{ cursor: 'pointer' }} // Add a pointer cursor to indicate it's clickable
                    >
                        {item.displayName}
                    </li>
                ))}
            </ul>

            {selectedUser && (
                <div>
                    <p>Chatting with: {selectedUser.displayName}</p>
                </div>
            )}
        </div>
    );
}
export {sUser};

export default Search;
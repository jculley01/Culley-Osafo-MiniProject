import React, { useState } from 'react';
import { firestore } from '../../firebase/firebase'; // Import Firebase

function UserSearch() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = async () => {
        try {
            const querySnapshot = await firestore.collection('users').where('name', '==', searchTerm).get();
            const results = [];
            querySnapshot.forEach((doc) => {
                results.push(doc.data());
            });
            setSearchResults(results);
        } catch (error) {
            console.error('User search error:', error);
        }
    }

    return (
        <div>
            <input
                type="text"
                placeholder="Search by name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>

            <ul>
                {searchResults.map((user) => (
                    <li key={user.id}>{user.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default UserSearch;

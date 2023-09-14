import React, { createContext, useContext, useState } from 'react';

// Create a context for the selected user
const SelectedUserContext = createContext();

// Create a custom hook to access the selected user context
export function useSelectedUser() {
    return useContext(SelectedUserContext);
}

// Create a context provider component
export function SelectedUserProvider({ children }) {
    const [selectedUser, setSelectedUser] = useState(null);

    return (
        <SelectedUserContext.Provider value={{ selectedUser, setSelectedUser }}>
            {children}
        </SelectedUserContext.Provider>
    );
}

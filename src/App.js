import "./App.css";
import NavBar from "./components/navBar";
import ChatBox from "./components/chatBox";
import Welcome from "./components/welcome";
import Search from "./components/search";
import { SelectedUserProvider } from './components/selectedUserContext';
import { useState, useEffect } from "react";
import {auth} from "./firebase/firebase.js"
import CreateRoom from "./components/createRoom";

function App() {
    const [user, setUser] = useState(false);
    useEffect(() => {
        // Set up an authentication listener
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                // User is signed in
                setUser(authUser);
            } else {
                // User is signed out
                setUser(null);
            }
        });

        // Clean up the listener when the component unmounts
        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <SelectedUserProvider>
        <div className="App">
            <NavBar />
            {!user ? (
                <Welcome />
            ) : (
                <>
                    <CreateRoom user = {user}/>
                </>
            )}
        </div>
        </SelectedUserProvider>
    );
}

export default App;
import React, { useState, useEffect } from "react";
import { db, auth, addUserToFirestore } from "./firebase/firebase.js"
import { collection, onSnapshot, addDoc, orderBy, query } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import GoogleSignInButton from './components/Authentication/signInWithGoogle';
import SignOutButton from './components/Authentication/signOutWithGoogle';
import SignOutWithGoogle from "./components/Authentication/signOutWithGoogle";
import SearchUser from "./components/Search/searchUser";
import UserSearch from "./components/Search/searchUser";
import './App.css';

function App() {
    const [user] = useAuthState(auth);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                // User is signed in, so add their information to Firestore
                addUserToFirestore(user)
                    .then(() => {
                        console.log('Successful User Query');
                    })
                    .catch((error) => {
                        console.error('Error adding user to Firestore:', error);
                    });
            } else {
                // User is signed out
                console.log('User signed out');
            }
        });

        // Cleanup the listener when the component unmounts
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const q = query(collection(db, "messages"), orderBy("timestamp"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            setMessages(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data(),
                }))
            );
        });

        return () => unsubscribe();
    }, []);

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    const sendMessage = async (e) => {
        e.preventDefault();

        if (input.trim()) {
            await addDoc(collection(db, "messages"), {
                text: input,
                timestamp: new Date(),
                uid: user.uid,
                displayName: user.displayName,
            });

            setInput("");
        }
    }


  return (
      <div className="App">
          <header>
              <h1>React Firebase Chat</h1>
              {user && <SignOutWithGoogle />}
          </header>
          <Divider/>
          <main>
              {user && <UserSearch />}
              {user ? (
                  <div className="messages-container">
                      {messages.map(({ id, data }) => (
                          <div
                              key={id}
                              className={`message ${data.uid === user.uid ? 'sent' : 'received'}`}
                          >
                              <span className="displayName">{data.displayName}: </span>
                              <span className="messageText">{data.text}</span>
                          </div>
                      ))}
                  </div>
              ) : (
                  <GoogleSignInButton />
              )}
          </main>
          <Divider/>
          {user && (
              <footer>
                  <form onSubmit={sendMessage}>
                      <input
                          value={input}
                          onChange={handleInputChange}
                          placeholder="Type a message"
                      />
                      <button type="submit">Send</button>
                  </form>
              </footer>
          )}
      </div>
);
}

const Divider = () => {
    return (
        <hr
            style={{
                margin: '20px 0',
                border: 'none',
                borderBottom: '1px solid #ccc',
            }}
        />
    );
};


export default App;


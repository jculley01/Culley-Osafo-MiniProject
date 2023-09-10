import React, { useState, useEffect } from "react";
import { db, auth } from "./firebase/firebase.js"
import { collection, onSnapshot, addDoc, orderBy, query } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import GoogleSignInButton from './components/Authentication/signInWithGoogle';
import SignOutButton from './components/Authentication/signOutWithGoogle';
import SignOutWithGoogle from "./components/Authentication/signOutWithGoogle";

function App() {
    const [user] = useAuthState(auth);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");

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
              <SignOutWithGoogle />
          </header>

          <main>
              {user ? (
                  <>
                      {messages.map(({ id, data }) => (
                          <div key={id} className={`message ${data.uid === user.uid ? "sent" : "received"}`}>
                              <span className="displayName">{data.displayName}: </span>
                              <span className="messageText">{data.text}</span>
                          </div>
                      ))}
                  </>
              ) : (
                  <GoogleSignInButton />
              )}
          </main>

          {user && (
              <footer>
                  <form onSubmit={sendMessage}>
                      <input value={input} onChange={handleInputChange} placeholder="Type a message" />
                      <button type="submit">Send</button>
                  </form>
              </footer>
          )}
      </div>
);
}

export default App;


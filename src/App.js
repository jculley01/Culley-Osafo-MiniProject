import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SignInWithGoogle from './components/Authentication/signInWithGoogle';
import UserSearch from './components/UserSearch/userSearch';
import Chat from './components/Messaging/chat';

function App() {
  return (
      <div>
        <header>
          <h1>My React Chat App</h1>
        </header>
          <SignInWithGoogle/>
      </div>
);
}

export default App;


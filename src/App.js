import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SignInWithGoogle from './components/Authentication/signInWithGoogle';
import UserSearch from './components/UserSearch/userSearch';
import Chat from './components/Messaging/chat';

function App() {
  return (
      <Router>
        <div>
          <header>
            <h1>My React Chat App</h1>
            {/* You can add a navigation bar here */}
          </header>
          <main>
            <Switch>
              {/* Route to sign-in */}
              <Route path="/signin">
                <SignInWithGoogle />
              </Route>
              {/* Route to user search */}
              <Route path="/search">
                <UserSearch />
              </Route>
              {/* Route to messaging */}
              <Route path="/chat">
                <Chat senderId="YOUR_SENDER_ID" receiverId="YOUR_RECEIVER_ID" />
              </Route>
              {/* You can add more routes as needed */}
              <Route path="/">
                {/* Home or landing page */}
                <h2>Welcome to My React Chat App</h2>
              </Route>
            </Switch>
          </main>
        </div>
      </Router>
  );
}

export default App;

# Chatroom Web Application using React and Google Firebase
## Introduction
The Chatroom web application was constructed using a React front-end and a Google Firebase back-end to allow users to sign in with their Google accounts and immediately begin messaging and searching for other users on the platform. 
## File Structure and Design Decisions
### App.js
This file is where all of the created components within the src folder are rendered to construct the web application. The file has a UseEffect set up to check for when a user is signed in vs. signed out because, depending on the result, different parts of the webpage will be rendered. When the user is not yet signed in, they are brought to a welcome page which prompts them to sign in to the application using a Google authentication button. Once the user signs in, the search, messaging, and chatbox features are then rendered. 
### search.js
This file is where the active user can search for other users who have signed into the web application before. This is done by sending the user information to Google Firebase when they sign in for the first time and creating a record of each user. Then within this file, a query is done on the database containing the user information once and is only queried again if there is a change in the collection. This query then stores all of the user information in an array. As the user begins typing into the search bar the array will begin to be searched for either their name or email. 
### chatbox.js
This file is where the chatbox is rendered. This is done by querying the messages collection within Firebase to retrieve all of the previous messages and then properly displaying them on the screen. From within this file, all of the message-sending components are also rendered. 
### sendMessage.js and message.js
These two files are rendered through the chatbox component. The message.js file is responsible for properly formatting the text retrieved from the collection and creating chat bubbles to be rendered within the chatbox. The sendMessage.js file is responsible for accepting the text that is inputted in the input bar and properly formatting and sending the messages to the correct collection within Google Firebase. 
## Desired File Structure and Additional Design Decisions
### createRoom.js
A feature that was unable to be solved was for the user to be able to search for a user and to private message them within the application. This was attempted within the createRoom.js file but was unsuccessful. The approach to solving this issue was to retrieve the active user and selected user information and create a unique key for those two users. This key would then be used to create a new collection of messages within Google Firebase. With more time, this file should have been able to be modified to correctly handle this use case. To properly implement this when functional, the createRoom.js file would render the chatbox and message feature through itself, and the createRoom.js file would be the only component rendered through App.js. 
## Demo


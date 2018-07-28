# Chat-Room-Service
A service based on Socket.io, that provides a chat rooms for users, whose can either create, or join using a unique code.

## How it works:
I used an Ajax calls for the front-end to post requring to create/join a room. After server-side validates the room code and nickname availability from the database, a Socket.io channel is created, and the chat room is rendered to the browser.

The process of sending chat message or even just typing, sends a notification for the back-end through a web socket to perform a certain action.

When a user leaves the room, the back-end removes his record from the database, and when the last user for a certain room disconnects, the room is completly removed.

## Technologies used:
  - Express.js
  - Mongoose
  - Socket.io
  - EJS view engine
  - AJAX
  - Jquery
  
## Screenshots
![Screenshot1](https://github.com/ahmedhammad97/Chat-Room-Service/blob/master/index.png)
![Screenshot2](https://github.com/ahmedhammad97/Chat-Room-Service/blob/master/chat.png)

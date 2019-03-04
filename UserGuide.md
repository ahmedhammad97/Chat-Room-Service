# How to use "Chat Room Service"

## Pre-Installation
**Make sure you have the following technologies installed on your computer:**

- Node.js [Install Node.js](https://nodejs.org/en/download/)

- Npm [Install Npm](https://www.npmjs.com/get-npm)

- MongoDB [Install MongoDB](https://docs.mongodb.com/manual/installation/)

- (Optional) Robo 3t [Install Robo 3t](https://robomongo.org/download). Robo 3t Allows you to view the content of the database at any time.

## Install dependencies
**Open the terminal (command line), and `cd` to the projects directory, then type:**
- `npm install`

**Once it is done installing the dependencies, you can now run the project by typing:**
- `node app`

**You should see a message saying**
>> Listening at port 5000
>> 
>> Connection has been made, now make fireworks...

**If not, then you probably have an error, contact me.**

**You can now head to your browser, type `http://localhost:5000` and hit enter, you should see the home page of the project.**

![Home page](https://github.com/ahmedhammad97/Chat-Room-Service/blob/master/index.png)

## Use case
**As a user, you now have two options after you type your nickname:**
- Create a new room, in which the server will generate a unique code for your new room, and redirect you to it.
- Join an already existing room using a room code. Note that trying to enter non-existing code will be rejected by the server.

**Note that the nickname you pick has to be unique per room, the server will check for that before proceeding.**

**Now after you have been directed to a room, you can simply start chatting, knowing that all your messages are encrypted from end-to-end. Enjoy!**

![Chat page](https://github.com/ahmedhammad97/Chat-Room-Service/blob/master/chat.png)

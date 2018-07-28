//Dependencies
const express = require('express');
const path = require("path");
const routes = require('./Routes/REST');
const dbConnection = require(__dirname + '/Database/dbConnect');
const Room = require(__dirname + '/Database/room');
const websocket = require(__dirname + '/Services/webSocket');


//Main Express component
const app = express();

//For static front-end files
app.use(express.static('public'));

//View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/public'));

//Listen to port
const server = app.listen(5000, ()=>{console.log("Listening at port 5000")});


//MongoDB Api's
dbConnection();

//Express REST
app.use(routes);


//Socket Apis'
websocket.socketConnection(server);

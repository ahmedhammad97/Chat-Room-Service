//Dependencies
const unique = require('./services/unique');
const express = require('express');
const socket = require('socket.io');
const bodyParser = require('body-parser');
const includes = require('array-includes');

//Main Express component
const app = express();

//BodyParser
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

//For static front-end files
app.use(express.static('public'));


const server = app.listen(5000, ()=>{
  console.log("Listening at port 5000");
});

//Main Socket component
const io = socket(server);


//Express REST
app.get('/', (req, res)=>{
  res.sendFile(__dirname + '/public/index.html');
});

var rooms = ["abcdefgh"];

app.post('/create', urlencodedParser, (req, res)=>{
    let code = unique.generate(rooms);
    res.send(code);
    rooms.push(code);
});

app.post('/join', urlencodedParser, (req, res)=>{
    if(includes(rooms, req.body.roomCode)){
      res.send({available: true});
    }
    else{
      res.send({available: false});
    }
});

io.on('connection', (socket)=>{
  console.log("Connection made with use of Socket");
});

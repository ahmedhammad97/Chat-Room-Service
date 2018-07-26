//Dependencies
const unique = require('./services/unique');
const express = require('express');
const socket = require('socket.io');
const bodyParser = require('body-parser');
const includes = require('array-includes');
const path = require("path");

//Main Express component
const app = express();

//BodyParser
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

//For static front-end files
app.use(express.static('public'));

//View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/public'));


const server = app.listen(5000, ()=>{
  console.log("Listening at port 5000");
});

//Main Socket component
const io = socket(server);


//Express REST
app.get('/', (req, res)=>{
  res.render('index');
});

var rooms = ["abcdefgh"];

app.post('/create', urlencodedParser, (req, res)=>{
    let code = unique.generate(rooms);
    res.render('chat', {'nickname' : req.body.nickname, 'code' : code});
    rooms.push(code);
});

app.post('/join', urlencodedParser, (req, res)=>{
    if(includes(rooms, req.body.roomCode)){
      res.render('chat', {'nickname' : req.body.nickname, 'code' : req.body.roomCode});
    }
    else{
      res.send({'available' : false});
    }
});



io.on('connection', (socket)=>{
  console.log("Connection made with use of Socket");
  socket.emit('initialConnection');

  socket.on('initialConnection', (data)=>{
    socket.join(data.roomCode);
    console.log(data.nickname + " joined room " + data.roomCode);
  });

  socket.on('chatMessage', data=>{
    io.sockets.in(data.room).emit('chatMessage', data);
  });

  socket.on('typing', data=>{
    socket.broadcast.to(data.room).emit('typing', data);
  })

});

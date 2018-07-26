//Dependencies
const express = require('express');
const socket = require('socket.io');
const bodyParser = require('body-parser');
const path = require("path");
const mongoose = require('mongoose');
const unique = require('./services/unique');
const Room = require(__dirname + '/Database/room');


//Main Express component
const app = express();

//For static front-end files
app.use(express.static('public'));

//View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/public'));

const server = app.listen(5000, ()=>{
  console.log("Listening at port 5000");
});

//BodyParser
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })


//Main Socket component
const io = socket(server);


//MongoDB Api's
mongoose.connect("mongodb://localhost:27017/testdb", { useNewUrlParser: true });

mongoose.Promise = global.Promise;

mongoose.connection.once('open', function(){
    console.log('Connection has been made, now make fireworks...');
}).on('error', function(error){
    console.log('Connection error:', error.err);
});


//Express REST
app.get('/', (req, res)=>{
  res.render('index');
});

app.post('/create', urlencodedParser, (req, res)=>{
    let code = unique.generate(Room);
    res.render('chat', {'nickname' : req.body.nickname, 'code' : code});
    //Adding room to Database
    let tempRoom = new Room({
      'code' : code,
      'members' : [{'nickname' : req.body.nickname}]
    });
    tempRoom.save();
});

app.post('/join', urlencodedParser, (req, res)=>{
    Room.findOne({'code' : req.body.roomCode}).then(result=>{
      if(result){
        res.render('chat', {'nickname' : req.body.nickname, 'code' : req.body.roomCode});
        result.members.push({'nickname' : req.body.nickname});
        result.save();
      }
      else{
        res.send({'available' : false});
      }
    })
});


//Socket Api's
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

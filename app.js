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
mongoose.connect("mongodb://localhost:27017/test4db", { useNewUrlParser: true });

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
      'members' : []
    });
    tempRoom.save();
});

app.post('/join', urlencodedParser, (req, res)=>{
    Room.findOne({'code' : req.body.roomCode}).then(result=>{
      if(result){ //This room exists
        let tempArr = result.members.filter(record=>{
          return record.nickname === req.body.nickname;
        })
        if(tempArr.length===0){ //The room exists and the nickname doesn't
          res.render('chat', {'nickname' : req.body.nickname, 'code' : req.body.roomCode});
        }
        else{ //This nickname exists - It must be unique -
          res.send({'available' : false, 'message' : 'Same nickname exists inside this room'});
        }
      }
      else{ //The room doesn't exist
        res.send({'available' : false, 'message' : 'Such a code does not currentyl exist'});
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

    //Adding User to Room Database
    Room.findOne({'code' : data.roomCode}).then(result=>{
      setTimeout(()=>{ //To ensure data is written to database
        result.members.push({'nickname' : data.nickname, 'id' : socket.id});
        result.save();
      },2000);
    })
  });


  socket.on('chatMessage', data=>{
    io.sockets.in(data.room).emit('chatMessage', data);
  });

  socket.on('typing', data=>{
    socket.broadcast.to(data.room).emit('typing', data);
  })

  socket.on('disconnect', ()=>{

    //Delete user from Database
    Room.findOne({'members.id' : socket.id}).then(result=>{
      if(result.members.length===1){
        //Remove room if the only member disconnected
        Room.findByIdAndRemove(result._id).exec();
        console.log("Deleted room " + result._id);
      }
      else{ //Just remove the member from members array
        let tempArr = result.members.filter(record=>{
          return record.id === socket.id;
        })
        console.log(tempArr[0].nickname + " disconnected");
        tempArr[0].remove();
        result.save();
      }
    })
  });

});

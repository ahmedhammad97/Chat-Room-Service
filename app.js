const express = require('express');
const socket = require('socket.io');
const bodyParser = require('body-parser');

const app = express();

var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })


app.use(express.static('public'));

const server = app.listen(5000, ()=>{
  console.log("Listening at port 5000");
});

app.get('/', (req, res)=>{
  res.sendFile(__dirname + '/public/index.html');
});

const io = socket(server);

var uniqueRooms = [];

app.post('/create', urlencodedParser, (req, res)=>{
    res.send('Room created for you ' + req.body.nickname);
});

app.post('/join', urlencodedParser, (req, res)=>{
    res.send('Room ' + req.body.roomCode + ' joined');
});

io.on('connection', (socket)=>{
  console.log("Connection made with use of Socket");
});

const socket = require('socket.io');
const Room = require('../Database/room');

exports.socketConnection = function(server){

  //Socket.io main function
  const io = socket(server);

  io.on('connection', socket=>{
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

      //Store Message to Database
      Room.findOne({'code' : data.room}).then(result=>{
        setTimeout(()=>{ //To ensure data is written to database
          result.messages.push({'message' : data.message, 'sender' : data.nickname});
          result.save();
        },2000);
      })
    });


    socket.on('typing', data=>{
      socket.broadcast.to(data.room).emit('typing', data);
    });


    socket.on('disconnect', ()=>{
      // //Delete user from Database
      // Room.findOne({'members.id' : socket.id}).then(result=>{
      //   if(result.members.length===1){
      //     //Remove room if the only member disconnected
      //     Room.findByIdAndRemove(result._id).exec();
      //     console.log("Deleted room " + result._id);
      //   }
      //   else{ //Just remove the member from members array
      //     let tempArr = result.members.filter(record=>{
      //       return record.id === socket.id;
      //     })
      //     console.log(tempArr[0].nickname + " disconnected");
      //     tempArr[0].remove();
      //     result.save();
      //   }
      // })
    });


  });
};

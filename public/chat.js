//Styling chatBox
let totalHeight = $(window).height();
$('#chatBox').css('height', totalHeight - 150);

const nickname = $('#nickname').text();
const roomCode = $('#roomCode').text();

const socket = io.connect('http://localhost:5000');

socket.on('initialConnection', data=>{
  socket.emit('initialConnection', {
    'nickname' : nickname,
    'roomCode' : roomCode
  })
});

socket.on('chatMessage', data=>{
  $("#chatBox").append('<br><p><strong>' + data.nickname + ': </strong>'+ data.message +'</p>');
});

$('#sendMessage').on('click', ()=>{
  socket.emit('chatMessage', {
    'nickname' : nickname,
    'room' : roomCode,
    'message' : $('#messageBox').val()
  });
  $('#messageBox').val("");
})

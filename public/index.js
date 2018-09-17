$('#create').on('click', ()=>{
  if(emptyNickname()){return;}

  //REQUESTING A ROOM FROM THE SERVER
  $.ajax({
    type: 'POST',
    data: {'nickname' :  $('#nickname').val()},
    url: 'http://localhost:5000/create',
    success: function(data) {
      startChat(data.code, $('#nickname').val());
    },
    error: function(data){
      $('#message').text('Something went wrong, check your connection!');
    }
  });

});


$('#join').on('click', ()=>{
  if(emptyNickname()){return;}

  //ASKING FOR PERMISSION TO JOIN THE ROOM
  $.ajax({
    type: 'POST',
    data: {'nickname' : $('#nickname').val(), 'roomCode' :  $('#roomCode').val()},
    url: 'http://localhost:5000/join',
    success: function(data) {
      if(data.available === false){
        $('#message').text(data.message);
      }
      else{
        startChat($('#roomCode').val(), $('#nickname').val());
      }
    },
    error: function(data){
      $('#message').text('Something went wrong, check your connection!');
    }
  });

});



// HELPER FUNCTIONS
function emptyNickname(){
  if($('#nickname').val().trim() == ""){
    $('#message').text('A nickname is required.');
    return true;
  }
  return false;
};

function startChat(code, nickname){
  localStorage.setItem("nickname", nickname);
  window.location.replace(`http://localhost:5000/room/${code}`);
}

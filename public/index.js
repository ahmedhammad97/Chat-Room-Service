$('#create').on('click', ()=>{
  if(emptyNickname()){return;}

  //REQUESTING A ROOM FROM THE SERVER
  $.ajax({
    type: 'POST',
    data: {'nickname' :  $('#nickname').val()},
    contentType: 'application/x-www-form-urlencoded',
    url: 'http://localhost:5000/create',
    success: function(data) {
      $('#message').text("Unkwon error, please email me at hammad97official@gmail.com");
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
    contentType: 'application/x-www-form-urlencoded',
    url: 'http://localhost:5000/join',
    success: function(data) {
      if(data.available){
        $('#message').text("Unkwon error, please email me at hammad97official@gmail.com");
      }
      else{
        $('#message').text('Wrong code, check it again.');
      }
    },
    error: function(data){
      $('#message').text('Something went wrong, check your connection!');
    }
  });

});



// HELPER FUNCTIONS
function emptyNickname(){
  if($('#nickname').val() == ""){
    $('#message').text('A nickname is required.');
    return true;
  }
  return false;
};

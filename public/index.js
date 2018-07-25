$('#create').on('click', ()=>{
  if(emptyNickname()){return;}

  $.ajax({
    type: 'POST',
    data: {'nickname' :  $('#nickname').val()},
    contentType: 'application/x-www-form-urlencoded',
    url: 'http://localhost:5000/create',
    success: function(data) {
      console.log(data);
    },
    error: function(data){
      $('#message').text('Something went wrong, check your connection!');
    }
  });

});

$('#join').on('click', ()=>{
  if(emptyNickname()){return;}

  $.ajax({
    type: 'POST',
    data: {'nickname' : $('#nickname').val(), 'roomCode' :  $('#roomCode').val()},
    contentType: 'application/x-www-form-urlencoded',
    url: 'http://localhost:5000/join',
    success: function(data) {
      console.log(data);
    },
    error: function(data){
      $('#message').text('Something went wrong, check your connection!');
    }
  });

});

function emptyNickname(){
  if($('#nickname').val() == ""){
    $('#message').text('A nickname is required.');
    return true;
  }
  return false;
};

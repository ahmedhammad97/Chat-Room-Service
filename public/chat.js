function joinRoom(nickname, code){
  window.location.replace('http://localhost:5000/chat.html').then(()=>{
    $('h1').text(nickname);
  })
}

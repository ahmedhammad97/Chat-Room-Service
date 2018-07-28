//Generates a random 8 digit code
exports.generate = function(Room){
  let exist, code;
  do{
    exist = false;
    code = "";

    for(i=0; i<8; i++){
      code = code + chars[Math.floor(Math.random()*chars.length)]
    }
    Room.findOne({'code' : code}).then(result=>{
      if(result){exist = true; console.log("Duplicate code generated " + code);}
    })
  }while(exist);
  return code;
}

//Set of characters can be used
const chars = [ 'a','b','c','d','e','f','g','h','i','j','k','l','n','o','p','q','r','s','t','u','j','w',
                'x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S',
                'T','U','V','W','X','Y','Z','0','1','2','3','4','5','6','7','8','9'];

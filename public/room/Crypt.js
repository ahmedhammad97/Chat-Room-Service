function encrypt(message, code){
  let encryptedMessage = ""
  let shiftValue = generateShiftValue(code)


  for(i=0; i<message.length; i++){
    let c = getComplement(message.charAt(i), shiftValue)
    if(c.charCodeAt(0) == 32){encryptedMessage += "\\"}
    else{encryptedMessage += c}
  }

  return encryptedMessage
}


function decrypt(hash, code){
  let decryptedMessage = ""
  let shiftValue = generateShiftValue(code)


  for(i=0; i<hash.length; i++){
    decryptedMessage += getInverseComplement(hash.charAt(i), shiftValue)
  }

  return decryptedMessage;
}



//Helper functions
function generateShiftValue(code){
  let shiftValue = 0;
  for(i=0; i<code.length; i++){
    shiftValue+=code.charCodeAt(i);
  }

  return shiftValue%94;
}


function getComplement(c, key){
  //Takes char and return it's shifted char

  let ascii = c.charCodeAt(0) + key

  if(ascii < 127){
    return String.fromCharCode(ascii);
  }else{
    return String.fromCharCode(ascii - 127 + 32);
  }

}


function getInverseComplement(c, key){
  //Takes shifted char and return it's original char

  let ascii = c.charCodeAt(0) - key

  if(ascii > 31){
    return String.fromCharCode(ascii)
  }else{
    return String.fromCharCode(126 - (31 - ascii))
  }
}

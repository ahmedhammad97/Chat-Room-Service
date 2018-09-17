const router = require('express').Router();
const bodyParser = require('body-parser');
const unique = require('../Services/unique');
const Room = require('../Database/room');

//BodyParser
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false });

//Home page
router.get('/', (req, res)=>{
  res.render('index');
});

router.get('/room/:code', (req, res)=>{
  res.render('chat', {'code' : req.params.code});
});

// Request a new room
router.post('/create', urlencodedParser, (req, res)=>{
    let code = unique.generate(Room);

    //Adding room to Database
    let tempRoom = new Room({
      'code' : code,
      'members' : []
    });
    tempRoom.save(err=>{
      if(err){res.end();}
      res.send({'code': code});
    });
});

//Request access to room by code
router.post('/join', urlencodedParser, (req, res)=>{
    Room.findOne({'code' : req.body.roomCode}).then(result=>{
      if(result){ //This room exists
        let tempArr = result.members.filter(record=>{
          return record.nickname === req.body.nickname;
        })
        if(tempArr.length===0){ //The room exists and the nickname doesn't
          res.send({'available' : true});
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

module.exports = router;

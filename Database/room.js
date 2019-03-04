const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MemberSchema = new Schema({
    nickname: String,
    id : String
});

const MessageSchema = new Schema({
    message: String,
    sender: String
});

const RoomSchema = new Schema({
    code: String,
    members: [MemberSchema],
    messages: [MessageSchema]
});

const Room = mongoose.model('room', RoomSchema);

module.exports = Room;

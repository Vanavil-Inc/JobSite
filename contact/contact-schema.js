const mongoose = require('mongoose');

const ObjectID = mongoose.Schema.Types.ObjectId;

module.exports = new mongoose.Schema({
    UserId: {
        type: String
    },
    UserName: {
        type: String
    },
    email: {
        type: String
    },
    TypeOfService:{
        type: String
    },
    Message: {
        type: String
    },
    ObjId: {
        type: ObjectID
    },
});
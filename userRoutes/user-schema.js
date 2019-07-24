const mongoose = require('mongoose');

const ObjectID = mongoose.Schema.Types.ObjectId;

module.exports = new mongoose.Schema({
    Status: {
        type: String
    },
    UserId: {
        type: String
    },
    Password: {
        type: String
    },
    UserName: {
        type: String
    },
    UserType: {
        type: String
    },
    email: {
        type: String
    },
    OtherContact: {
        type: String
    },
    Organisation: {
        type: String
    },
    MOM: {
        type: String
    },
    Address: {
        type: String
    },
    ObjId: {
        type: ObjectID
    },
    Country: {
        type: String
    }
});

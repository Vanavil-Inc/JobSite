const mongoose = require('mongoose');

const ObjectID = mongoose.Schema.Types.ObjectId;

module.exports = new mongoose.Schema({
    JobNo:{
        type: String
    },
    JobTitle:{
        type: String
    },
    Qualification:{
        type: String
    },
    PrimarySkills:{
        type: String
    },
    Experience:{
        type: String
    },
    JobDetails:{
        type: String
    },
    ObjId: {
        type: ObjectID
    },
});
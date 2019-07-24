const mongoose = require('mongoose')

const ObjectID = mongoose.Schema.Types.ObjectId;

module.exports = new mongoose.Schema({
    FIN: {
        type: String
    },
    PassportNum: {
        type: String
    },
    PlaceOfISsue: {
        type: String
    },
    IssueDate: {
        type: String
    },
    ExpiryDate: {
        type: String
    },
    PrimarySkills: {
        type: String
    },
    AdditionalSkills: {
        type: String
    },
    ExpInYear: {
        type: String
    },
    ExpInMonth: {
        type: String
    },
    CurrentEmp: {
        type: String
    },
    CurrentSal: {
        type: String
    },
    ExpSal: {
        type: String
    },
    JoinDate: {
        type: String
    },
    OverTime: {
        type: Boolean
    },
    Accommodation: {
        type: Boolean
    },
    AirTicket: {
        type: Boolean
    },
    DocDirPath: {
        type: String
    },
    ObjId: {
        type: ObjectID
    }
});
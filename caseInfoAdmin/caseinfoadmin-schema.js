const mongoose = require('mongoose')

const ObjectID = mongoose.Schema.Types.ObjectId;

module.exports = new mongoose.Schema({
    caseId: {
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
    JobTitle: {
        type: String
    },
    EmployerDetails: {
        type: String
    },
    InterviewDate: {
        type: String
    },
    OfferedSal: {
        type: String
    },
    AcceptedSal: {
        type: String
    },
    LevyDetails: {
        type: String
    },
    JoinDate: {
        type: String
    },
    WorkPermitNumber: {
        type: String
    },
    SecurityBond: {
        type: String
    },
    AirTravel: {
        type: String
    },
    TravelDate: {
        type: String
    },
    AccomodationDetail: {
        type: String
    },
    JoinedDate: {
        type: String
    },
    CurrStatus: {
        type: String
    },
    TimeStamp: {
        type: String
    },
    DocDirPath: {
        type: String
    },
    ObjId: {
        type: ObjectID
    }
});


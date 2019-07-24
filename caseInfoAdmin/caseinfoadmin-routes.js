const router = require('express').Router();

const caseInfoAdmin = require('./caseinfoadmin-model');

router.route('/caseinfoadmin').post((req, res) => {
    const caseId = req.body.caseId;
    const PassportNum = req.body.PassportNum;
    const PlaceOfISsue = req.body.PlaceOfISsue;
    const IssueDate = req.body.IssueDate;
    const ExpiryDate = req.body.ExpiryDate;
    const JobTitle = req.body.JobTitle;
    const EmployerDetails = req.body.EmployerDetails;
    const InterviewDate = req.body.InterviewDate;
    const OfferedSal = req.body.OfferedSal;
    const AcceptedSal = req.body.AcceptedSal;
    const LevyDetails = req.body.LevyDetails;
    const JoinDate = req.body.JoinDate;
    const WorkPermitNumber = req.body.WorkPermitNumber;
    const SecurityBond = req.body.SecurityBond;
    const AirTravel = req.body.AirTravel;
    const TravelDate = req.body.TravelDate;
    const AccomodationDetail = req.body.AccomodationDetail;
    const JoinedDate = req.body.JoinedDate;
    const CurrStatus = req.body.CurrStatus;
    const TimeStamp = req.body.TimeStamp;
    const DocDirPath = req.body.DocDirPath;

    caseInfoAdmin.find({
        caseId : caseId
    },function(err, response){
        if(err){
            console.log(err)
            res.json({
                success: false,
                message: 'Something went wrong',
                error: err
            })
        }
        if(response.length>0){
            console.log("Case ID is already present")
            res.json({
                success: false,
                message: 'Case ID is already present',
                error: err
            })
    } else {
        var caseInfoObj = {
            caseId : caseId,
            PassportNum : PassportNum,
            PlaceOfISsue : PlaceOfISsue,
            IssueDate : IssueDate,
            ExpiryDate : ExpiryDate,
            JobTitle : JobTitle,
            EmployerDetails : EmployerDetails,
            InterviewDate : InterviewDate,
            OfferedSal : OfferedSal,
            AcceptedSal : AcceptedSal,
            LevyDetails : LevyDetails,
            JoinDate : JoinDate,
            WorkPermitNumber : WorkPermitNumber,
            SecurityBond : SecurityBond,
            AirTravel : AirTravel,
            TravelDate : TravelDate,
            AccomodationDetail : AccomodationDetail,
            JoinedDate : JoinedDate,
            CurrStatus : CurrStatus,
            TimeStamp : TimeStamp,
            DocDirPath : DocDirPath    
    
        }
        caseInfoAdmin.create(caseInfoObj, (err, caseInfo) => {
            if (err) {
                res.json({
                    success: false,
                    message: 'Email Id is already registered',
                    error: err
                });
            }
                
                res.json({
                    success: true,
                    message: "User Registered Successfully",
                result: caseInfo
                });
        })
    }
})
});

router.route('/deletecaseinfoadmin').delete((req, res) => {
    const caseId = req.body.caseId;

    caseInfoAdmin.findOneAndDelete({
        caseId : caseId},function(err, response){
            if (err) {
                res.json({
                    success: false,
                    message: 'CaseInfo not deleted',
                    error: err
                });
            }
            if(response != null){
                res.json({
                    success: true,
                    message: "CaseInfo is Deleted successfully",
                    result: response
                }); 
            } else {
                console.log("CaseInfo Not Found");
                res.json({
                    success: false,
                    message: 'CaseInfo Not Found',
                    error: err
                });
            }
        })
});

router.route('/getcaseinfoadmin').get((req, res) => {
    caseInfoAdmin.find({},function(err, response){
        if (err) {
            res.json({
                success: false,
                message: 'CaseInfoAdmin not found',
                error: err
            });
        } 
            if(response != null){
            console.log("CaseInfoAdmin Found");
            res.json({
                success: true,
                message: 'CaseInfoAdmin Found',
                result: response
            });
        }else{
            res.json({
                success: false,
                message: 'CaseInfoAdmin Not Found',
                error: err
            });
        }
    })
});

router.route('/updatecaseinfoadmin').put((req, res) => {
    const caseId = req.body.caseId;
    const JobTitle = req.body.JobTitle;

    caseInfoAdmin.findOneAndUpdate({
        caseId : caseId},{$set: {JobTitle: JobTitle}},function(err, response){
        if (err) {
            res.json({
                success: false,
                message: 'JobTitle not updated',
                error: err
            });
        } 
        if(response != null){
            res.json({
                success: true,
                message: "JobTitle is updated successfully",
                //result: response
            }); 
        } else {
            console.log("CaseInfoAdmin Not Found");
            res.json({
                success: false,
                message: 'CaseInfoAdmin Not Found',
                error: err
            });
        }

            
    })
});



module.exports = router;
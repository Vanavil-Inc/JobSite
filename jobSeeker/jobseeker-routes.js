const router = require('express').Router();

const seeker = require('./jobseeker-model');

router.route('/jobseeker').post((req, res) => {
    const FIN = req.body.FIN;
    const PassportNum = req.body.PassportNum;
    const PlaceOfISsue = req.body.PlaceOfISsue;
    const IssueDate = req.body.IssueDate;
    const ExpiryDate = req.body.ExpiryDate;
    const PrimarySkills = req.body.PrimarySkills;
    const AdditionalSkills = req.body.AdditionalSkills;
    const ExpInYear = req.body.ExpInYear;
    const ExpInMonth = req.body.ExpInMonth;
    const CurrentEmp = req.body.CurrentEmp;
    const CurrentSal = req.body.CurrentSal;
    const ExpSal = req.body.ExpSal;
    const JoinDate = req.body.JoinDate;
    const OverTime = req.body.OverTime;
    const Accommodation = req.body.Accommodation;
    const AirTicket = req.body.AirTicket;
    const DocDirPath = req.body.DocDirPath;

    seeker.find({
        PassportNum : PassportNum
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
            console.log("You already have an account with us. Please login")
            res.json({
                success: false,
                message: 'You already have an account with us. Please login',
                error: err
            })
    } else {
        var jobSeekerObj = {
            FIN : FIN,
            PassportNum : PassportNum,
            PlaceOfISsue : PlaceOfISsue,
            IssueDate : IssueDate,
            ExpiryDate : ExpiryDate,
            PrimarySkills : PrimarySkills,
            AdditionalSkills : AdditionalSkills,
            ExpInYear : ExpInYear,
            ExpInMonth : ExpInMonth,
            CurrentEmp : CurrentEmp,
            CurrentSal : CurrentSal,
            ExpSal : ExpSal,
            JoinDate : JoinDate,
            OverTime : OverTime,
            Accommodation : Accommodation,
            AirTicket : AirTicket,
            DocDirPath : DocDirPath    
    
        }
        seeker.create(jobSeekerObj, (err, jobSeeker) => {
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
                result: jobSeeker
                });
        })
    }
})
    
});

router.route('/deletejobseeker').delete((req, res) => {
        const PassportNum = req.body.PassportNum;

        seeker.findOneAndDelete({
            PassportNum : PassportNum},function(err, response){
                if (err) {
                    res.json({
                        success: false,
                        message: 'Jobseekar not deleted',
                        error: err
                    });
                }
                if(response != null){
                    res.json({
                        success: true,
                        message: "Jobseeker is Deleted successfully",
                        result: response
                    }); 
                } else {
                    console.log("Jobseekar Not Found");
                    res.json({
                        success: false,
                        message: 'Jobseekar Not Found',
                        error: err
                    });
                }
            })
});

router.route('/updatejobseeker').put((req, res) => {
    const PassportNum = req.body.PassportNum;
    const PrimarySkills = req.body.PrimarySkills;

    seeker.findOneAndUpdate({
        PassportNum : PassportNum},{$set: {PrimarySkills: PrimarySkills}},function(err, response){
        if (err) {
            res.json({
                success: false,
                message: 'PrimarySkills not updated',
                error: err
            });
        } 
        if(response != null){
            res.json({
                success: true,
                message: "PrimarySkills is updated successfully",
                //result: response
            }); 
        } else {
            console.log("User Not Found");
            res.json({
                success: false,
                message: 'User Not Found',
                error: err
            });
        }

            
    })
});

router.route('/getjobseeker').get((req, res) => {
    seeker.find({},function(err, response){
        if (err) {
            res.json({
                success: false,
                message: 'Jobseekers not found',
                error: err
            });
        } 
        if(response != null){
            console.log("Jobseekers Found");
            res.json({
                success: true,
                message: 'Jobseekers Found',
                result: response
            });
            }else {
            res.json({
                success: false,
                message: 'No Jobseekers Found',
                error: err
            });
         }
    })
});



module.exports = router;
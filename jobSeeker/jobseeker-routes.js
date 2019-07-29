const router = require('express').Router();
const jwt = require('jsonwebtoken');

const seeker = require('./jobseeker-model');
const UserEmp = require('../userRoutes/user-model');
const constant=require('../Constant');
const config = require('../Config');

router.route('/jobseeker').post((req, res) => {
    const Status = req.body.Status;
    const UserId = req.body.UserId;
    const Password = req.body.Password;
    const UserName = req.body.UserName;
    const UserType = req.body.UserType;
    const email = req.body.email;
    const Address = req.body.Address;
    const Country = req.body.Country;
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
        UserId : UserId
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
            Status : Status,
            UserId : UserId,
            Password : Password,
            UserName : UserName,
            UserType : UserType,
            email : email,
            Address : Address,
            Country : Country,
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
                result: response
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

router.route('/getalljobseeker').post((req, res) => {

    const UserId = req.body.UserId;
    const token = req.body.token;

    UserEmp.find({UserId : UserId}, function(err,empResp){
        if(err){
            res.json({
                success: false,
                message: 'Employer not found',
                error: err
            });
        }
        if(token === empResp[0].token){
            seeker.find({},function(err, response){
                if (err) {
                    res.json({
                        success: false,
                        message: 'Jobseekers not found',
                        error: err
                    });
                } 
                if(response.length > 0){
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
        }
    })
    
});

router.route('/getonejobseeker').post((req, res) => {

    const UserId = req.body.UserId;
    const token = req.body.token;

    seeker.find({UserId : UserId},function(err, response){
        if (err) {
            res.json({
                success: false,
                message: 'User data not found',
                error: err
            });
        } 
        console.log("Updated dbtoken " + response[0].token)
        console.log("passed token : " + token)
        if(token === response[0].token){
            if(response.length > 0){
                res.json({
                    success: true,
                    message: 'User data Found',
                    result: response
                });
                }else {
                res.json({
                    success: false,
                    message: constant.userEmpty,
                    error: err
                });
             }
        } else {
            res.json({
                success: false,
                message: "Not Authorized",
                error: err
            });
        }
    })
});

router.route('/jslogin').post((req, res) => {
    const UserId = req.body.UserId;
    const Password = req.body.Password;

    console.log(UserId);
    console.log(Password);

    let token =  jwt.sign({UserId, Password}, config.secret, { expiresIn: '60000' });
    console.log("generated token : " + token)

    seeker.find({
        UserId : UserId
    },function(err, userResp){
        if(err){
            console.log(err)
            res.json({
                success: false,
                message: constant.genericError,
                error: err
            })
        }

        console.log(userResp)
    
        if(userResp != "") {
            if(userResp[0].Password === Password){
                seeker.findOneAndUpdate({UserId : UserId},{token : token}, function(err, resp){
                    if(err){
                        console.log("update err" + err);
                    } else {
                        console.log("token updated : "+ token);
                        // console.log("token updated response : " + resp);
                        seeker.find({UserId : UserId}, function(err, updateResp){
                            if(err){
                                res.json({
                                    success: false,
                                    message: constant.genericError,
                                    error: err
                                })
                            } else {
                                console.log("updated new resp : " + updateResp);
                                res.json({
                                    success: true,
                                    message: "Update success",
                                    result: updateResp
                                });
                            }
                        })
                       
                    }
                })
            } else { 
                res.json({
                    success: false,
                    message: constant.loginError,
                    error: err
                });
            }
        } else {
            res.json({
                success: false,
                message: 'User does not Exists',
                error: err
            })

        }
        
    })
});



module.exports = router;
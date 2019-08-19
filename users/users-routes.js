const router = require('express').Router();
const jwt = require('jsonwebtoken');
const multiparty = require('connect-multiparty');
multipartyMiddleware = multiparty();
router.use(multipartyMiddleware);
const fs = require('fs');
var base64 = require('file-base64');

const seeker = require('./users-model');
const constant=require('../Constant');
const config = require('../Config');

router.route('/register').post((req, res,next) => {

    try{
    if(req.body.UserType === "999"){
    const file = req.files.file;
    console.log("fiel " + JSON.stringify(file));

        var imgFile = req.files.file;
        console.log("sdsd", imgFile);
        if (imgFile) {

        var d = new Date();
        var n = d.getTime();
        if (imgFile) {
            var type = imgFile.type;
            var extension = type.split('/');
        }

        var path = './public/uploads/' + n + '.' + extension[1];

        base64.encode(imgFile.path, function (err, base64String) {
            if (err) {
                res.json({
                    success: false,
                    result: "Internal Server Error",
                    status: 500
                });
            } else {
                // console.log("base64 " + base64String);
                if(base64String){
                    fs.writeFile(path, base64String,{encoding : 'base64'}, function (err) {
                        if (err) {
                            console.log("Err " + err);
                        }
                    });
                }
            }
        })
    }
}
} catch(e){
 console.log(e);
}
        const Status = req.body.Status;
        const UserId = req.body.UserId;
        const Password = req.body.Password;
        const UserName = req.body.UserName;
        const UserType = req.body.UserType;
        const email = req.body.email;
        const OtherContact = req.body.OtherContact;
        const Organisation = req.body.Organisation;
        const MOM = req.body.MOM;
        const Address = req.body.Address;
        const Country = req.body.Country;
        const FIN = req.body.FIN;
        const PassportNum = req.body.PassportNum;
        const PlaceOfISsue = req.body.PlaceOfISsue;
        const IssueDate = req.body.IssueDate;
        const ExpiryDate = req.body.ExpiryDate;
        const PrimarySkills = req.body.PrimarySkills;
        const AdditionalSkills = req.body.AdditionalSkills;
        const OtherSkills = req.body.OtherSkills;
        const ExpInYear = req.body.ExpInYear;
        const ExpInMonth = req.body.ExpInMonth;
        const CurrentEmp = req.body.CurrentEmp;
        const CurrentSal = req.body.CurrentSal;
        const ExpSal = req.body.ExpSal;
        const JoinDate = req.body.JoinDate;
        const OverTime = req.body.OverTime;
        const Accommodation = req.body.Accommodation;
        const AirTicket = req.body.AirTicket;
    
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
                res.json({
                    success: false,
                    message: 'UserId is already Registered',
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
                OtherContact:OtherContact,
                Organisation:Organisation,
                MOM:MOM,
                Address : Address,
                Country : Country,
                FIN : FIN,
                PassportNum : PassportNum,
                PlaceOfISsue : PlaceOfISsue,
                IssueDate : IssueDate,
                ExpiryDate : ExpiryDate,
                PrimarySkills : PrimarySkills,
                AdditionalSkills : AdditionalSkills,
                OtherSkills:OtherSkills,
                ExpInYear : ExpInYear,
                ExpInMonth : ExpInMonth,
                CurrentEmp : CurrentEmp,
                CurrentSal : CurrentSal,
                ExpSal : ExpSal,
                JoinDate : JoinDate,
                OverTime : OverTime,
                Accommodation : Accommodation,
                AirTicket : AirTicket,
                DocDirPath : path    
        
            }
            console.log(jobSeekerObj)
            seeker.create(jobSeekerObj, (err, jobSeeker) => {
                if (err) {
                    res.json({
                        success: false,
                        message: 'User Id is already registered',
                        error: err
                    });
                }
                    res.json({
                        success: true,
                        message: "Registered Successfully",
                        result: jobSeeker
                    });
            })
        }
    })
    
});

router.route('/deletejobseeker').post((req, res) => {
    const UserId = req.body.UserId;

        // console.log("userid"+UserId);
        console.log(req.body);
        seeker.findOneAndDelete({
            UserId : UserId},function(err, response){
                if (err) {
                    res.json({
                        success: false,
                        message: 'Jobseeker not deleted',
                        error: err
                    });
                }
                if(response != null){
                    res.json({
                        success: true,
                        message: "Deleted successfully",
                        result: response
                    }); 
                } else {
                    console.log("Jobseeker Not Found");
                    res.json({
                        success: false,
                        message: 'Jobseeker Not Found',
                        error: err
                    });
                }
            })
});

router.route('/updatejobseeker').put((req, res) => {
    const UserId = req.body.UserId;
    const Status = req.body.Status;
    const UserType = req.body.UserType;

    if(UserType != ""){
    if(UserType === "999"){
        seeker.findOneAndUpdate({
            UserId : UserId},req.body,function(err, response){
            if (err) {
                res.json({
                    success: false,
                    message: 'Profile not updated',
                    error: err
                });
            } 
            if(response != null){
                res.json({
                    success: true,
                    message: "Profile updated successfully",
                    result: response
                }); 
            } else {
                console.log("User Not Found");
                // console.log(err);
                res.json({
                    success: false,
                    message: "Profile not updated",
                    error: err
                });
            }   
        })
    } else {
        seeker.findOneAndUpdate({
            UserId : UserId},{Status: Status},function(err, response){
            if (err) {
                res.json({
                    success: false,
                    message: 'Profile not updated',
                    error: err
                });
            } 
            if(response != null){
                res.json({
                    success: true,
                    message: "Profile updated successfully",
                    result: response
                }); 
            } else {
                console.log("User Not Found");
                res.json({
                    success: false,
                    message: "Profile not updated",
                    error: err
                });
            }   
        })

    }
} else {
    res.json({
        success: false,
        message: "Not authorized",
        error: err
    });

}
    
});

router.route('/manageaccount').put((req, res) => {

    const UserId = req.body.UserId;
    const CurrentPassword = req.body.CurrentPassword;
    const Password = req.body.Password;
    
    seeker.find({
        UserId : UserId
    },function(err, userResp){
        if(err){
            console.log(err)
            res.json({
                success: false,
                message: 'Something went wrong',
                error: err
            })
        }

        if(userResp != ""){
            if(userResp[0].Password === CurrentPassword){
                seeker.findOneAndUpdate({
                    UserId : UserId},{UserId : UserId,Password : Password},{new: true},function(err, response){
                    if (err) {
                        res.json({
                            success: false,
                            message: 'Internal server error 500',
                            error: err
                        });
                    } 
                        res.json({
                            success: true,
                            message: "Password updated successfully",
                            result: response
                        });   
                })

            } else {
                res.json({
                    success: false,
                    message: "Current Password is wrong",
                    error: err
                });
            }
        } else {
            res.json({
                success: false,
                message: "User does not exists",
                error: err
            });

        }
    });
});

router.route('/getalljobseeker').post((req, res) => {

    const UserId = req.body.UserId;
    const UserType = "999";

    seeker.find({UserId : UserId}, function(err,resp){
        if(err){
            res.json({
                success: false,
                message: 'Employer not found',
                error: err
            });
        }
       // console.log("DATA VALUES : " + empResp)
        // console.log("UPDTED TOKEN  " + resp[0].token)
        // console.log("PASSED TOKEN : " + token)
        if(UserId !=""){
            seeker.find({UserType:UserType},function(err, response){
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
    } else {
        res.json({
            success: false,
            message: 'Jobseekers not found',
            error: err
        });
    }
    }) 
});

router.route('/getonejobseeker').post((req, res) => {

    const UserId = req.body.UserId;

    seeker.find({UserId : UserId},function(err, response){
        if (err) {
            res.json({
                success: false,
                message: 'User data not found',
                error: err
            });
        } 
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
    })
});

router.route('/login').post((req, res) => {
    const UserId = req.body.UserId;
    const Password = req.body.Password;
    const deviceWidth = req.body.deviceWidth;

    let token =  jwt.sign({UserId, Password}, config.secret, { expiresIn: '10000' });
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

                                if((updateResp[0].UserType ==="999" && deviceWidth < 768 ) || deviceWidth > 768 )      {
                                    res.json({
                                        success: true,
                                        message: "Login success",
                                        result: updateResp          
                                    });
                                }
                                else {
                                    res.json({
                                        success: false,
                                        message: "User does not exists",
                                    });
                                }
                               
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
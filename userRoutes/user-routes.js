const router = require('express').Router();

const UserEmp = require('./user-model'); 
const constant=require('../Constant')


 router.route('/useremp').post((req, res) => {

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
    const Country = req.body.Country

    UserEmp.find({
        UserId : UserId
    },function(err, response){
        if(err){
            console.log(err)
            res.json({
                success: false,
                message: constant.genericError,
                error: err
            })
        }
        if(response.length>0){
            res.json({
                success: false,
                message: constant.userExists,
                error: err
            })
        } else {
            var userInfoObj = {
                Status : Status,
                UserId : UserId,
                Password : Password,
                UserName : UserName,
                UserType : UserType,
                email : email,
                OtherContact : OtherContact,
                Organisation : Organisation,
                MOM : MOM,
                Address : Address,
                Country : Country
            }
        
           UserEmp.create(userInfoObj, (err, user) => {
                        if (err) {
                            res.json({
                                success: false,
                                message: 'UserId is already Registered',
                                error: err
                            });
                        }
        
                        res.json({
                            success: true,
                            message: constant.userReg,
                            result: user
                        });
        
                    });
        }
        
    })
});

router.route('/deleteuseremp').delete((req, res) => {
    const UserId = req.body.UserId;

    UserEmp.findOneAndDelete({
        UserId : UserId},function(err, response){
        if (err) {
            res.json({
                success: false,
                message: 'UserId not deleted',
                error: err
            });
        } 
        if(response != null){
            res.json({
                success: true,
                message: constant.userDeleted,
                result: response
            }); 
        } else {
            console.log("UserId Not Found");
            res.json({
                success: false,
                message: constant.userNotFound,
                error: err
            });
        }

            
    })
});

router.route('/updateuseremp').put((req, res) => {
    const UserId = req.body.UserId;
    const Status = req.body.Status;

    UserEmp.findOneAndUpdate({
        UserId : UserId},{$set: {Status: Status}},function(err, response){
        if (err) {
            res.json({
                success: false,
                message: 'UserId not updated',
                error: err
            });
        } 
        if(response != null){
            res.json({
                success: true,
                message: constant.userStatusUpdated,
                result: response
            }); 
        } else {
            res.json({
                success: false,
                message: constant.userNotFound,
                error: err
            });
        }

            
    })
});

router.route('/getuseremp').get((req, res) => {
    UserEmp.find({},function(err, response){
        if (err) {
            res.json({
                success: false,
                message: 'Users not found',
                error: err
            });
        } 
        if(response.length > 0){
            res.json({
                success: true,
                message: 'Users Found',
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

    UserEmp.find({
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
        if(userResp==null){
            res.json({
                success: false,
                message: 'User does not Exists',
                error: err
            })
        } 
        if(userResp != null) {
            if(userResp[0].UserId == UserId && userResp[0].Password == Password){
                res.json({
                    success: true,
                    message: constant.loginSuccess,
                    result: userResp
                });
            }else{
                res.json({
                    success: false,
                    message: constant.loginError,
                    error: err
                });
            }
        }
        
    })
});

module.exports = router;

const router = require('express').Router();
const jwt = require('jsonwebtoken');

const contact = require('./contact-model'); 
const constant=require('../Constant');
const config = require('../Config');

router.route('/contact').post((req, res) => {
    const UserId = req.body.UserId;
    const UserName = req.body.UserName;
    const email = req.body.email;
    const TypeOfService = req.body.TypeOfService;
    const Message = req.body.Message;

    var contactObj = {        
        UserId : UserId,        
        UserName : UserName,        
        email : email,
        TypeOfService : TypeOfService,
        Message : Message       
    }

    contact.create(contactObj, (err, user) => {
                if (err) {
                    res.json({
                        success: false,
                        message: 'Not Submitted',
                        error: err
                    });
                }

                res.json({
                    success: true,
                    message: constant.contactSubmit,
                    result: user
                });

            });
});

module.exports = router;
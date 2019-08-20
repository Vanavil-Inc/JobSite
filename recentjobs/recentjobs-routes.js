const router = require('express').Router();
const jwt = require('jsonwebtoken');

const recentjobs = require('./recentjobs-model'); 
const constant=require('../Constant');
const config = require('../Config');

router.route('/jobpost').post((req, res) => {
    const JobNo = req.body.JobNo;
    const JobTitle = req.body.JobTitle;
    const Qualification = req.body.Qualification;
    const PrimarySkills = req.body.PrimarySkills;
    const Experience = req.body.Experience;
    const JobDetails = req.body.JobDetails;


    var jobsObj = {        
        JobNo : JobNo,        
        JobTitle : JobTitle,        
        Qualification : Qualification,
        PrimarySkills : PrimarySkills,
        Experience : Experience,  
        JobDetails : JobDetails   
    }

    recentjobs.create(jobsObj, (err, jobs) => {
        if (err) {
            res.json({
                success: false,
                message: 'Not Submitted',
                error: err
            });
        }

        res.json({
            success: true,
            message: "Job Posted Successfully",
            result: jobs
        });

    });
});

router.route('/getallrecentjobs').get((req, res) => {
    recentjobs.find({}, function(err, response){
        if (err) {
            res.json({
                success: false,
                message: 'Jobs not found',
                error: err
            });
        } 
            if(response.length > 0){
                res.json({
                    success: true,
                    message: 'Recent Jobs Found',
                    result: response
                });
                }else {
                res.json({
                    success: false,
                    message: "No Recent Jobs",
                    error: err
                });
             }
    })
});



module.exports = router;
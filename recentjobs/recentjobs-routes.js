const router = require('express').Router();

const recentjobs = require('./recentjobs-model');

router.route('/jobpost').post((req, res) => {
    console.log(req.body);
    const JobNo = req.body.JobNo;
    const JobTitle = req.body.JobTitle;
    const Qualification = req.body.Qualification;
    const PrimarySkills = req.body.PrimarySkills;
    const Experience = req.body.Experience;
    const JobDetails = req.body.JobDetails;

    recentjobs.find({
        JobNo: JobNo
    }, function (err, response) {
        if (err) {
            console.log(err)
            res.json({
                success: false,
                message: 'Something went wrong',
                error: err
            })
        }
        if (response.length > 0) {
            res.json({
                success: false,
                message: 'JobNo already Exists',
                error: err
            })
        } else {
            var jobsObj = {
                JobNo: JobNo,
                JobTitle: JobTitle,
                Qualification: Qualification,
                PrimarySkills: PrimarySkills,
                Experience: Experience,
                JobDetails: JobDetails
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
        }
    })
});

router.route('/getallrecentjobs').get((req, res) => {
    recentjobs.find({}, function (err, response) {
        if (err) {
            res.json({
                success: false,
                message: 'Jobs not found',
                error: err
            });
        }
        if (response.length > 0) {
            res.json({
                success: true,
                message: 'Recent Jobs Found',
                result: response
            });
        } else {
            res.json({
                success: false,
                message: "No Recent Jobs",
                error: err
            });
        }
    })
});

router.route('/deletejob').post((req, res) => {
    const JobNo = req.body.JobNo;

    // console.log("userid"+UserId);
    console.log(req.body);
    recentjobs.findOneAndDelete({
        JobNo: JobNo
    }, function (err, response) {
        if (err) {
            res.json({
                success: false,
                message: 'Job not deleted',
                error: err
            });
        }
        if (response != null) {
            res.json({
                success: true,
                message: "Deleted successfully",
                result: response
            });
        } else {
            console.log("Job Not Found");
            res.json({
                success: false,
                message: 'Job Not Found',
                error: err
            });
        }
    })
});
router.route('/updatejob').put((req, res) => {
    const JobNo = req.body.JobNo;
    recentjobs.findOneAndUpdate({
        JobNo: JobNo
    }, req.body, function (err, response) {
        if (err) {
            res.json({
                success: false,
                message: 'Job not updated',
                error: err
            });
        }
        if (response != null) {
            res.json({
                success: true,
                message: "Job updated successfully",
                result: response
            });
        } else {
            console.log("Job Not Found");
            // console.log(err);
            res.json({
                success: false,
                message: "Job not updated",
                error: err
            });
        }
    })
});


module.exports = router;
const router = require('express').Router();

router.get('/', (req, res) => {
res.status(200).json({ message: 'Connected!' });
});

router.use('/api', require('../userRoutes/user-routes'));
router.use('/api', require('../jobSeeker/jobseeker-routes'));
router.use('/api', require('../caseInfoAdmin/caseinfoadmin-routes'));
router.use('/api', require('../contact/contact-routes'));

module.exports = router;
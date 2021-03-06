const router = require('express').Router();

router.get('/', (req, res) => {
res.status(200).json({ message: 'Connected!' });
});

// router.use('/api', require('../userRoutes/user-routes'));
router.use('/api', require('../users/users-routes'));
router.use('/api', require('../caseInfoAdmin/caseinfoadmin-routes'));
router.use('/api', require('../contact/contact-routes'));
router.use('/api', require('../recentjobs/recentjobs-routes'));

module.exports = router;
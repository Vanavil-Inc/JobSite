const router = require('express').Router();
const contact = require('./contact-model');
const constant = require('../Constant');
var nodemailer = require('nodemailer');

router.route('/contact').post((req, res) => {
	const UserId = req.body.UserId;
	const UserName = req.body.UserName;
	const email = req.body.email;
	const TypeOfService = req.body.TypeOfService;
	const Message = req.body.Message;

	var contactObj = {
		UserId: UserId,
		UserName: UserName,
		email: email,
		TypeOfService: TypeOfService,
		Message: Message
	};

	var transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: 'shobana.sekar@vanavil-systems.com',
			pass: 'shobana104'
		}
	});

	var mailOptions = {
		//from: email,
		to: 'shobana.sekar@vanavil-systems.com, thangadurai.muthusamy@vanavil-systems.com',
		subject: TypeOfService,
		html:
			'<span>An User submitted Contact form<br><br>UserId: ' +
			UserId +
			'<br>UserName: ' +
			UserName +
			'<br>Email: ' +
			email +
			'<br>Type Of Service: ' +
			TypeOfService +
			'<br>Message: ' +
			Message +
			'</span>'
	};

	transporter.sendMail(mailOptions, function(error, info) {
		if (error) {
			console.log(error);
		} else {
			console.log('Email sent: ' + info.response);
		}
	});

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

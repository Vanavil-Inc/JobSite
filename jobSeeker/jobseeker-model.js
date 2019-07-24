const mongoose = require('mongoose')

const JobSeeker = mongoose.model('JobSeeker', require('./jobseeker-schema'));

module.exports = JobSeeker;
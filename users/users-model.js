const mongoose = require('mongoose')

const JobSeeker = mongoose.model('JobSeeker', require('./users-schema'));

module.exports = JobSeeker;
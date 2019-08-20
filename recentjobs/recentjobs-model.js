const mongoose = require('mongoose')

const recentjobs = mongoose.model('recentjobs', require('./recentjobs-schema'));

module.exports = recentjobs;
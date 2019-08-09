const mongoose = require('mongoose')

const contact = mongoose.model('contact', require('./contact-schema'));

module.exports = contact;
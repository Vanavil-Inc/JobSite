const mongoose = require('mongoose')

const users = mongoose.model('users', require('./users-schema'));

module.exports = users;
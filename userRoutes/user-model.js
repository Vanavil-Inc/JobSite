const mongoose = require('mongoose')

const UserEmp = mongoose.model('UserEmp', require('./user-schema'));

module.exports = UserEmp;
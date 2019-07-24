const mongoose = require('mongoose')

const CaseInfoAdmin = mongoose.model('CaseInfoAdmin', require('./caseinfoadmin-schema'));

module.exports = CaseInfoAdmin;
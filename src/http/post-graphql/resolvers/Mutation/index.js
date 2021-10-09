const { student } = require('./student')
const { auth } = require('./auth')
const { outOfClassTime } = require('./outOfClassTime')
const { schoolyear } = require('./schoolyear')

module.exports.Mutation = {
  ...student,
  ...auth,
  ...outOfClassTime,
  ...schoolyear,
}

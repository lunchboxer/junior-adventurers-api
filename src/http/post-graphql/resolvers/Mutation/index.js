const { student } = require('./student')
const { auth } = require('./auth')
const { outOfClassTime } = require('./outOfClassTime')

module.exports.Mutation = {
  ...student,
  ...auth,
  ...outOfClassTime,
}

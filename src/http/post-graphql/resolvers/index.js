const student = require('./student')
const user = require('./user')
const mutation = require('./mutation')

module.exports.resolvers = {
  Query: {
    ...student,
    ...user,
  },
  Mutation: {
    ...mutation,
  },
}

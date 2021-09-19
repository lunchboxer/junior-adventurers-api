const student = require('./student')
const user = require('./user')
const Mutation  = require('./Mutation')

module.exports.resolvers = {
  Query: {
    ...student,
    ...user,
  },
  Mutation
}

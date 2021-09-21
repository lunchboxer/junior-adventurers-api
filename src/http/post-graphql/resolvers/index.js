const { Student } = require('./Student')
const { User } = require('./User')
const Mutation = require('./Mutation')

module.exports.resolvers = {
  Query: {
    ...Student,
    ...User,
  },
  Mutation,
}

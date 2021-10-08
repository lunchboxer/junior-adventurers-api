const { Student } = require('./Student')
const { User } = require('./User')
const { Schoolyear } = require('./Schoolyear')
const { Mutation } = require('./Mutation')

module.exports.resolvers = {
  Query: {
    ...Student,
    ...User,
    ...Schoolyear,
  },
  Mutation,
}

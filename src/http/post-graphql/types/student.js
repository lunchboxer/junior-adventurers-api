const { objectType, extendType, stringArg, idArg } = require('nexus')
const data = require('@begin/data')

const Student = objectType({
  name: 'Student',
  definition(t) {
    t.id('key')
    t.string('name')
    t.string('birthdate')
    t.string('languages')
  },
})

const StudentQuery = extendType({
  type: 'Query',
  definition(t) {
    // STUDENT //
    t.field('student', {
      type: 'Student',
      args: {
        key: idArg(),
      },
      resolve: async (_, { key }) => {
        return data.get({ table: 'students', key })
      },
    })
    // STUDENTS //
    t.nullable.list.field('students', {
      type: 'Student',
      resolve: async () => {
        return await data.get({ table: 'students' })
      },
    })
  },
})

const StudentMutation = extendType({
  type: 'Mutation',
  definition(t) {
    // CREATE STUDENT //
    t.field('createStudent', {
      type: 'Student',
      args: {
        name: stringArg(),
        birthdate: stringArg(),
        languages: stringArg(),
      },
      authorize: (_, _arguments, context) => Boolean(context.userId),
      resolve: async (_, arguments_, context) => {
        const student = await data.set({ table: 'students', ...arguments_ })
        return student
      },
    })
  },
})

module.exports = {
  Student,
  StudentQuery,
  StudentMutation,
}

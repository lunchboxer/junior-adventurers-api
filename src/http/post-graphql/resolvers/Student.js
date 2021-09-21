const data = require('@begin/data')

module.exports.Student = {
  student: async (_, { key }) => {
    return await data.get({ table: 'students', key })
  },
  students: async () => {
    return await data.get({ table: 'students', limit: 25 })
  },
}

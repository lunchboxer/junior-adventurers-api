const data = require('@begin/data')

module.exports = {
  student: async (_, { key }) => {
    return await data.get({ table: 'students', key })
  },
  students: async () => {
    return await data.get({ table: 'students' })
  },
}

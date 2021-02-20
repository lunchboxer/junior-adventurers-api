const data = require('@begin/data')

module.exports = {
  student: async (_, { key }) => {
    const foundStudent = await data.get({ table: 'students', key })
    return foundStudent
  },
  students: async () => {
    return await data.get({ table: 'students' })
  },
}

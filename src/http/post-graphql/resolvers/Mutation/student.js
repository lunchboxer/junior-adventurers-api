const data = require('@begin/data')
const { onlyAuthenticatedUsers } = require('../../permissions')

module.exports.student = {
  createStudent: async (_, parameters, context) => {
    await onlyAuthenticatedUsers(context.userId)
    const student = await data.set({ table: 'students', ...parameters })
    return student
  },
  deleteStudent: async (_, { key }, context) => {
    await onlyAuthenticatedUsers(context.userId)
    const student = await data.get({ table: 'students', key })
    if (!student) throw new Error('Student not found')
    await data.destroy({ table: 'students', key })
    return { student }
  },
  updateStudent: async (_, parameters, context) => {
    await onlyAuthenticatedUsers(context.userId)
    const student = await data.get({ table: 'students', key: parameters.key })
    if (!student) throw new Error('student not found.')
    const updatedStudent = { ...student, ...parameters }
    await data.set({ ...updatedStudent })
    return updatedStudent
  },
  resetCredit: async (_, { studentIds, credit }, context) => {
    await onlyAuthenticatedUsers(context.userId)
    const table = 'students'
    const rows = studentIds.map(student => {
      return { table, key: student }
    })
    const studentsToUpdate = await data.get(rows)
    const newRows = studentsToUpdate.map(row => {
      return { table, ...row, credit }
    })
    return await data.set(newRows)
  },
}

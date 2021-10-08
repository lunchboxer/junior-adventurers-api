const data = require('@begin/data')
const { onlyAuthenticatedUsers } = require('../../permissions')

module.exports.outOfClassTime = {
  studentOutOfClass: async (_, parameters, context) => {
    await onlyAuthenticatedUsers(context.userId)
    // Check if student exists
    const realStudent = await data.get({
      table: 'students',
      key: parameters.studentId,
    })
    if (!realStudent) throw new Error('student not found.')
    parameters.leftTime = parameters.leftTime || new Date().toJSON()
    return await data.set({ table: 'outOfClassTime', ...parameters })
  },
  studentBackInClass: async (_, parameters, context) => {
    await onlyAuthenticatedUsers(context.userId)
    // Check if leaveRecord exists
    const record = await data.get({
      table: 'outOfClassTime',
      key: parameters.key,
    })
    if (!record) throw new Error('record not found for update')
    parameters.returnTime = parameters.returnTime || new Date().toJSON()
    return await data.set({ table: 'outOfClassTime', ...record, ...parameters })
  },
}

const data = require('@begin/data')
const { onlyAuthenticatedUsers } = require('../../permissions')

module.exports.schoolyear = {
  createSchoolyear: async (_, parameters, context) => {
    await onlyAuthenticatedUsers(context.userId)
    return await data.set({ table: 'schoolyears', ...parameters })
  },
  deleteSchoolyear: async (_, { key }, context) => {
    await onlyAuthenticatedUsers(context.userId)
    const foundSchoolyear = await data.get({ table: 'schoolyears', key })
    if (!foundSchoolyear) throw new Error('record not found')

    await data.destroy({ table: 'schoolyears', key })
    return foundSchoolyear
  },
  updateSchoolyear: async (_, parameters, context) => {
    await onlyAuthenticatedUsers(context.userId)
    const foundSchoolyear = await data.get({
      table: 'schoolyears',
      key: parameters.key,
    })
    if (!foundSchoolyear) throw new Error('record not found')
    return await data.set({
      table: 'schoolyears',
      ...foundSchoolyear,
      ...parameters,
    })
  },
}

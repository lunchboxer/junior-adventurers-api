const data = require('@begin/data')
const { onlyAuthenticatedUsers } = require('../permissions')

module.exports = {
  userCount: async () => {
    return await data.count({ table: 'users' })
  },
  me: async (_, parameters, context) => {
    return await onlyAuthenticatedUsers(context.userId)
  },
  user: async (_, { key }) => {
    const foundUser = await data.get({ table: 'users', key })
    return foundUser
  },
  users: async () => {
    return await data.get({ table: 'users' })
  },
}

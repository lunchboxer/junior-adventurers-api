const data = require('@begin/data')

const onlyAuthenticatedUsers = async userId => {
  if (!userId) throw new Error('Not Authorized. Log in to continue.')
  const foundUser = await data.get({ table: 'users', key: userId })
  if (!foundUser) {
    throw new Error('Authenticated user not found. Please log in again.')
  }
  return foundUser
}

module.exports = {
  onlyAuthenticatedUsers,
}

const data = require('@begin/data')
const { hash, compare } = require('bcrypt')
const { sign } = require('jsonwebtoken')
const { isValidEmail } = require('../../utils')
const { onlyAuthenticatedUsers } = require('../../permissions')

const forceUniqueEmail = async email => {
  const allUsers = await data.get({ table: 'users' })
  const sameEmailUser = allUsers.find(aUser => aUser.email === email)
  if (sameEmailUser) {
    throw new Error('A user with that email already exists.')
  }
}

module.exports.auth = {
  createUser: async (_, { name, email, password }, context) => {
    if (!isValidEmail(email)) throw new Error('email address not valid')
    await forceUniqueEmail(email)
    const hashedPassword = await hash(password, 10)
    const user = await data.set({
      table: 'users',
      name,
      email,
      password: hashedPassword,
    })
    return {
      token: sign({ userId: user.key }, process.env.JWT_SECRET),
      user,
    }
  },
  deleteUser: async (_, { key }, context) => {
    await onlyAuthenticatedUsers(context.userId)
    const user = await data.get({ table: 'users', key })
    if (!user) throw new Error('User not found.')
    await data.destroy({ table: 'users', key })
    return user
  },
  changePassword: async (_, { newPassword, oldPassword }, context) => {
    const user = await onlyAuthenticatedUsers(context.userId)
    const passwordValid = await compare(oldPassword, user.password)
    if (!passwordValid) throw new Error('Old password not correct.')
    const hashedPassword = await hash(newPassword, 10)
    await data.set({
      ...user,
      password: hashedPassword,
    })
    return user
  },
  login: async (_, { email, password }) => {
    const users = await data.get({ table: 'users' })
    const user = users.find(u => u.email === email)
    if (!user) throw new Error(`No user found with email: ${email}`)
    const passwordValid = await compare(password, user.password)
    if (!passwordValid) throw new Error('Invalid password')
    return {
      token: sign({ userId: user.key }, process.env.JWT_SECRET),
      user,
    }
  },
  updateUser: async (_, parameters, context) => {
    await onlyAuthenticatedUsers(context.userId)
    const user = await data.get({ table: 'users', key: parameters.key })
    const updatedUser = { ...user, ...parameters }
    if (!user) throw new Error('User not found.')
    if (parameters.email) {
      // validate email
      if (!isValidEmail(parameters.email)) {
        throw new Error('email address not valid')
      }
      forceUniqueEmail(parameters.email)
    }
    await data.set({ ...updatedUser })
    return updatedUser
  },
}

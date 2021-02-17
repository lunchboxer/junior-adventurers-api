const {
  objectType,
  extendType,
  stringArg,
  idArg,
  nullable,
  nonNull,
} = require('nexus')
const { hash, compare } = require('bcrypt')
const data = require('@begin/data')
const { sign } = require('jsonwebtoken')
const isemail = require('isemail')
// const arc = require('@architect/functions')

const verifyEmail = async user => {
  //  arc.events.publish({ name: 'account-verify-email', payload: user })
}

const User = objectType({
  name: 'User',
  definition(t) {
    t.id('key')
    t.string('name')
    t.string('email')
    t.boolean('isVerified')
  },
})

const AuthPayload = objectType({
  name: 'AuthPayload',
  definition(t) {
    t.string('token')
    t.field('user', { type: 'User' })
  },
})

const UserQuery = extendType({
  type: 'Query',
  definition(t) {
    // USER COUNT //
    t.field('userCount', {
      type: 'Int',
      resolve: async () => {
        return await data.count({ table: 'users' })
      },
    })
    // USERS //
    t.nullable.list.field('users', {
      type: 'User',
      authorize: (_, _arguments, context) => Boolean(context.userId),
      resolve: async () => {
        return await data.get({ table: 'users' })
      },
    })
    // USER //
    t.nullable.field('user', {
      type: 'User',
      args: {
        key: nonNull(idArg()),
      },
      authorize: (_, _arguments, context) => Boolean(context.userId),
      resolve: async (_root, { key }) => {
        return await data.get({ table: 'users', key })
      },
    })
    // ME //
    t.nullable.field('me', {
      type: 'User',
      authorize: (_, _arguments, context) => Boolean(context.userId),
      resolve: async (_, _arguments, context) => {
        const user = await data.get({ table: 'users', key: context.userId })
        if (!user) throw new Error('User not found. Please log in again.')
        return user
      },
    })
  },
})

const UserMutation = extendType({
  type: 'Mutation',
  definition(t) {
    // LOGIN //
    t.field('login', {
      type: 'AuthPayload',
      args: {
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      resolve: async (_, { email, password }) => {
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
    })
    // CREATE USER //
    t.field('createUser', {
      type: 'AuthPayload',
      args: {
        name: nullable(stringArg()),
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      authorize: async (_, _arguments, context) => {
        // allow user creation if there aren't any users, otherwise must be logged in.
        const userCount = await data.count({ table: 'users' })
        if (userCount) return Boolean(context.userId)
        return true
      },
      resolve: async (_, { name, email, password }) => {
        // validate email
        if (!isemail.validate(email)) {
          throw new Error('email address not valid')
        }
        // enforce unique email
        const allUsers = await data.get({ table: 'users' })
        const sameEmailUser = allUsers.find(aUser => aUser.email === email)
        if (sameEmailUser) {
          throw new Error('A user with that email already exists.')
        }
        const hashedPassword = await hash(password, 10)
        const user = await data.set({
          table: 'users',
          name,
          email,
          password: hashedPassword,
        })
        verifyEmail(user)
        return {
          token: sign({ userId: user.key }, process.env.JWT_SECRET),
          user,
        }
      },
    })
    // DELETE USER //
    t.field('deleteUser', {
      type: 'User',
      args: {
        key: nonNull(idArg()),
      },
      authorize: (_, _arguments, context) => Boolean(context.userId),
      resolve: async (_, { key }) => {
        const user = await data.get({ table: 'users', key })
        if (!user) throw new Error('User not found.')
        await data.destroy({ table: 'users', key })
        return user
      },
    })
    // UPDATE USER //
    t.field('updateUser', {
      type: 'User',
      args: {
        key: nonNull(idArg()),
        name: stringArg(),
        email: stringArg(),
      },
      authorize: (_, _arguments, context) => Boolean(context.userId),
      resolve: async (_, arguments_) => {
        const user = await data.get({ table: 'users', key: arguments_.key })
        const updatedUser = { ...user, ...arguments_ }
        if (!user) throw new Error('User not found.')
        if (arguments_.email) {
          // validate email
          if (!isemail.validate(arguments_.email)) {
            throw new Error('email address not valid')
          }
          // enforce unique email
          const allUsers = await data.get({ table: 'users' })
          const sameEmailUser = allUsers.find(aUser => {
            return aUser.email === arguments_.email
          })
          if (sameEmailUser) {
            throw new Error('A user with that email already exists.')
          }
          if (arguments_.email !== user.email) verifyEmail(updatedUser)
        }
        await data.set({ ...updatedUser })
        return updatedUser
      },
    })
    // CHANGE PASSWORD //
    t.field('changePassword', {
      type: 'User',
      // user will need to be logged in and input old password
      args: {
        oldPassword: nonNull(stringArg()),
        newPassword: nonNull(stringArg()),
      },
      authorize: (_, _arguments, context) => Boolean(context.userId),
      resolve: async (_, { oldPassword, newPassword }, context) => {
        const user = await data.get({ table: 'users', key: context.userId })
        if (!user) throw new Error('User not found. Please log in again.')
        const passwordValid = await compare(oldPassword, user.password)
        if (!passwordValid) throw new Error('Old password not correct.')
        const hashedPassword = await hash(newPassword, 10)
        await data.set({
          ...user,
          password: hashedPassword,
        })
        return user
      },
    })
  },
})

module.exports = {
  User,
  UserQuery,
  UserMutation,
  AuthPayload,
}

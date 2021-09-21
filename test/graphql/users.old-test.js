const test = require('tape')
const tiny = require('tiny-json-http')
const sandbox = require('@architect/sandbox')
const url = 'http://localhost:6666/graphql'
const queries = require('./users-queries.js')

const user = { name: 'Jim', email: 'example@mail.com', password: 'password' }
const headers = { Authorization: '' }

test('Start sandbox', async t => {
  t.plan(1)
  const result = await sandbox.start()
  t.ok(result, 'Sandbox started!')
})

test('User count returns zero', async t => {
  t.plan(1)
  const result = await tiny.post({
    url,
    data: { query: queries.USER_COUNT },
  })
  t.ok(result.body.data.userCount === 0, "got '0'")
})

test('Create user and log in', async t => {
  t.plan(2)
  try {
    const result = await tiny.post({
      url,
      data: { query: queries.CREATE_USER, variables: user },
    })
    t.ok(result, 'got result')
    const token = result.body.data.createUser.token
    t.ok(token, 'response contains token')
    headers.Authorization = token
    user.key = result.body.data.createUser.user.key
  } catch (error) {
    t.fail(error)
  }
})

test('User count returns 1', async t => {
  t.plan(1)
  const result = await tiny.post({
    url,
    data: { query: queries.USER_COUNT },
  })
  t.ok(result.body.data.userCount === 1, "got '1'")
})

test('get a user', async t => {
  t.plan(3)
  try {
    const result = await tiny.post({
      url,
      headers,
      data: { query: queries.USER, variables: { key: user.key } },
    })
    t.ok(result, 'got result')
    t.ok(
      !result.body.errors && result.body.data,
      'data returned without errors',
    )
    t.ok(
      result.body.data.user.email === user.email,
      'returned the right user info',
    )
  } catch (error) {
    t.fail(error)
  }
})

test('update a user', async t => {
  t.plan(3)
  try {
    const result = await tiny.post({
      url,
      headers,
      data: {
        query: queries.UPDATE_USER,
        variables: { key: user.key, name: 'Sam' },
      },
    })
    t.ok(result, 'got result')
    t.ok(
      !result.body.errors && result.body.data,
      'data returned without errors',
    )
    t.ok(
      result.body.data.updateUser.name === 'Sam',
      'returned updated user info',
    )
  } catch (error) {
    t.fail(error)
  }
})

test('get a list of users', async t => {
  t.plan(3)
  try {
    const result = await tiny.post({
      url,
      headers,
      data: { query: queries.USERS },
    })
    t.ok(result, 'got result')
    t.ok(Array.isArray(result.body.data.users), 'returned a list of users')
    const foundUser = result.body.data.users.find(u => u.key === user.key)
    t.ok(foundUser.key, 'List includes expected user.')
  } catch (error) {
    t.fail(error)
  }
})

test('Change user password', async t => {
  t.plan(3)
  try {
    const result = await tiny.post({
      url,
      headers,
      data: {
        query: queries.CHANGE_PASSWORD,
        variables: {
          oldPassword: user.password,
          newPassword: 'pswd',
        },
      },
    })
    t.ok(result, 'got result')
    t.ok(
      result.body.data.changePassword.key === user.key,
      'Changed password for expected user',
    )
    const loginResult = await tiny.post({
      url,
      headers,
      data: {
        query: queries.LOGIN,
        variables: {
          email: user.email,
          password: 'pswd',
        },
      },
    })
    const token = loginResult.body.data.login.token
    t.ok(token, 'Can log in with new password')
    headers.Authorization = token
  } catch (error) {
    t.fail(error)
  }
})

test('Delete a user', async t => {
  t.plan(2)
  try {
    const result = await tiny.post({
      url,
      headers,
      data: { query: queries.DELETE_USER, variables: { key: user.key } },
    })
    t.ok(result, 'got result')
    t.ok(result.body.data.deleteUser.key === user.key, 'deleted expected user')
  } catch (error) {
    t.fail(error)
  }
})

test('Shut down sandbox', async t => {
  t.plan(1)
  const result = await sandbox.end()
  t.equal(result, 'Sandbox successfully shut down')
})

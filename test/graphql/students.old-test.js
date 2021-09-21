const test = require('tape')
const tiny = require('tiny-json-http')
const sandbox = require('@architect/sandbox')
const url = 'http://localhost:6666/graphql'
const queries = require('./students-queries.js')
const userQueries = require('./users-queries.js')

const user = { name: 'Jim', email: 'example@mail.com', password: 'password' }
const student = { name: 'Charles', languages: 'Speaks French at home' }
const headers = { Authorization: '' }

test('Start sandbox', async t => {
  t.plan(1)
  const result = await sandbox.start()
  t.ok(result, 'Sandbox started!')
})

test('Create user and log in', async t => {
  t.plan(2)
  try {
    const result = await tiny.post({
      url,
      data: { query: userQueries.CREATE_USER, variables: user },
    })
    t.ok(result, 'got result')
    const token = result.body.data.createUser.token
    t.ok(token, 'response contains token')
    headers.Authorization = token
  } catch (error) {
    t.fail(error)
  }
})

test('insert new student', async t => {
  t.plan(3)
  try {
    const variables = student
    const result = await tiny.post({
      url,
      headers,
      data: { query: queries.CREATE_STUDENT, variables },
    })
    t.ok(result, 'got result')
    t.ok(
      !result.body.errors && result.body.data,
      'data returned without errors',
    )
    t.ok(
      result.body.data.createStudent.name === variables.name,
      'returned data matches input',
    )
    student.key = result.body.data.createStudent.key
  } catch (error) {
    t.fail(error)
  }
})

test('get a student', async t => {
  t.plan(3)
  try {
    const result = await tiny.post({
      url,
      headers,
      data: { query: queries.STUDENT, variables: { key: student.key } },
    })
    t.ok(result, 'got result')
    t.ok(
      !result.body.errors && result.body.data,
      'data returned without errors',
    )
    t.ok(
      result.body.data.student.name === student.name,
      'returned the right student info',
    )
  } catch (error) {
    t.fail(error)
  }
})

test('get a list of students', async t => {
  t.plan(3)
  try {
    const result = await tiny.post({
      url,
      data: { query: queries.STUDENTS },
    })
    t.ok(result, 'got result')
    t.ok(
      Array.isArray(result.body.data.students),
      'returned a list of students',
    )
    const foundStudent = result.body.data.students.find(
      s => s.key === student.key,
    )
    t.ok(foundStudent.key, 'List includes expected student.')
  } catch (error) {
    t.fail(error)
  }
})

test('Shut down sandbox', async t => {
  t.plan(1)
  const result = await sandbox.end()
  t.equal(result, 'Sandbox successfully shut down')
})

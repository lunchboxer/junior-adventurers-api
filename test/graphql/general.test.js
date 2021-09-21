const { getIntrospectionQuery } = require('graphql')
const test = require('tape')
const tiny = require('tiny-json-http')
const sandbox = require('@architect/sandbox')
const url = 'http://localhost:6666/graphql'

test('Start sandbox', async t => {
  t.plan(1)
  const result = await sandbox.start()
  t.ok(result, 'Sandbox started!')
})

test('GraphQL introspection query returns schema', async t => {
  t.plan(2)
  try {
    const result = await tiny.post({
      url,
      data: { query: getIntrospectionQuery({ descriptions: false }) },
    })
    t.ok(result, 'got result')
    const schema = result.body.data.__schema
    t.ok(schema, 'result contains a schema.')
  } catch (error) {
    t.fail(error)
  }
})

test('Shut down sandbox', async t => {
  t.plan(1)
  const result = await sandbox.end()
  t.equal(result, 'Sandbox successfully shut down')
})

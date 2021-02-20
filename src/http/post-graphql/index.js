const { graphql } = require('graphql')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const { resolvers } = require('./resolvers')
const { getUserId } = require('./utils')
const fs = require('fs')
const path = require('path')

const typeDefs = fs
  .readFileSync(path.join(__dirname, 'schema.graphql'), 'utf8')
  .toString()

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})

// In this case the request body is a simple json string
module.exports.handler = async function http({ headers, body }) {
  const { query, variables, operationName } = JSON.parse(body)
  try {
    const context = { userId: getUserId(headers) }
    const result = await graphql(
      schema,
      query,
      {},
      context,
      variables,
      operationName,
    )
    return JSON.stringify(result)
  } catch (error) {
    if (process.env.NODE_ENV === 'production') {
      return JSON.strinigy({ error: error.name, message: error.message })
    }
    return JSON.stringify({
      error: error.name,
      message: error.message,
      stack: error.stack,
    })
  }
}

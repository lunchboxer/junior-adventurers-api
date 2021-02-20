const arc = require('@architect/functions')
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

const queryHandler = async ({ headers, body }) => {
  try {
    const gqlcontext = { userId: getUserId(headers) }
    const result = await graphql(
      schema,
      body.query,
      {},
      gqlcontext,
      body.variables,
      body.operationName,
    )
    return {
      json: result,
    }
  } catch (error) {
    if (process.env.NODE_ENV === 'production') {
      return { json: { error: error.name, message: error.message } }
    }
    return {
      json: { error: error.name, message: error.message, stack: error.stack },
    }
  }
}

module.exports.handler = arc.http.async(queryHandler)

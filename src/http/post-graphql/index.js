const arc = require('@architect/functions')
const { ApolloServer } = require('apollo-server-lambda')
const { schema } = require('./schema')
const { verify } = require('jsonwebtoken')

function getUserId(event) {
  const Authorization = event.headers.authorization
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '')
    const verifiedToken = verify(token, process.env.JWT_SECRET)
    return verifiedToken && verifiedToken.userId
  }
}

const server = new ApolloServer({
  schema,
  context: ({ context, event }) => {
    return {
      ...context,
      userId: getUserId(event),
    }
  },
})

const graphqlHandler = server.createHandler()

module.exports.handler = function (event, context, callback) {
  const body = arc.http.helpers.bodyParser(event)
  // Support for AWS HTTP API syntax
  event.httpMethod = event.httpMethod
    ? event.httpMethod
    : event.requestContext.http.method
  // Body is now parsed, re-encode to JSON for Apollo
  event.body = JSON.stringify(body)
  graphqlHandler(event, context, callback)
}

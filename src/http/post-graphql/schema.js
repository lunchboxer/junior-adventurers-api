const { makeSchema, fieldAuthorizePlugin } = require('nexus')
const path = require('path')
const types = require('./types')

exports.schema = makeSchema({
  types,
  shouldGenerateArtifacts: process.env.NODE_ENV === 'testing',
  outputs: {
    typegen: path.join(__dirname, 'nexus-typegen.ts'),
    schema: path.join(__dirname, 'schema.graphql'),
  },
  plugins: [fieldAuthorizePlugin()],
})

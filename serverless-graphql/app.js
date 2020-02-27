const { GraphQLServer, GraphQLServerLambda } = require('graphql-yoga')
const { makeSchema } = require('nexus')
const { permissions } = require('./src/permissions')
const types = require('./src/types')

const isDev = process.env.NODE_ENV === 'development'

const schema = makeSchema({
  types,
  outputs: isDev
    ? {
        schema: __dirname + '/schema.graphql',
        typegen: __dirname + '/src/generated/nexus.ts',
      }
    : false,
})

if (isDev) {
  new GraphQLServer({
    schema,
    middlewares: [permissions],
    context: request => {
      return {
        ...request,
      }
    },
  }).start(() => console.log(`🚀 Server ready at: http://localhost:4000`))
} else {
  const lambda = new GraphQLServerLambda({
    schema,
    middlewares: [permissions],
    context: request => {
      return {
        ...request,
      }
    },
  })

  exports.handler = async (event, context, callback) => {
    return new Promise((resolve, reject) => {
      lambda.handler(event, context, (err, output) => {
        if (err) {
          reject(err)
        }
        resolve(output)
      })
    })
  }
}

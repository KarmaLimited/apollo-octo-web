const { GraphQLServer } = require('graphql-yoga')
const { Prisma } = require('prisma-binding')
const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const AuthPayload = require('./resolvers/AuthPayload')
const Subscription = require('./resolvers/Subscription')
const Feed = require('./resolvers/Feed')

const resolvers = {
  Query,
  Mutation,
  AuthPayload,
  Subscription,
  Feed
}

// GQL Yoga Server
const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  // resolverValidationOptions is to silence warning -> Type "Node" is missing a "resolveType" resolver.
  // The warning is specifically about the Node interface (not type) and that it does not have a specific resolver
  resolverValidationOptions : {
    requireResolversForResolveType: false
  },
  context: req => ({
    ...req,
    db: new Prisma({
      typeDefs: 'src/generated/prisma.graphql',
      endpoint: 'https://eu1.prisma.sh/stefan-lachmann-e05219/my-web-stefan/dev',
      secret: 'mysecret123',
      debug: true,
    }),
  }),
})
server.start(() => console.log(`Server is running`))
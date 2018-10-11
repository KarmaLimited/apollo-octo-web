const { ApolloServer, gql } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schema');

// In the most basic sense, the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.
const server = new ApolloServer({ typeDefs, resolvers });

server.applyMiddleware({ app })

app.listen({ port: 4000}, () =>
 console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
/*
server.listen().then(({ url }) => {
    console.log(`Live at ${url}`);
});
*/
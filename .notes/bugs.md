## BUGLIST:

## Open

### currently votes do not auto update with front-end subscription
it works after reload but not real time like with new posts.
investigate and rebuild

## Closed

#### -server startup:
Type "Node" is missing a "resolveType" resolver. Pass false into "resolverValidationOptions.requireResolversForResolveType" to disable this warning.
Server is running on http://localhost:4000

Fixed:
File:
`~/server/src/index.js`
Solution:
```
const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  // resolverValidationOptions is to silence warning -> Type "Node" is missing a "resolveType" resolver.
  // The warning is specifically about the Node interface (not type) and that it does not have a specific resolver
  resolverValidationOptions : {
    requireResolversForResolveType: false
  },
  ```


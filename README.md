# My Web Project // WIP
### a site i'am developing with react, apollo, graphql, prisma and some other stuff to get api data and create a personal workspace for myself to get my feeds, take notes, lists and all kinds of stuff 


notes:
in ~/src/components/linkList.js -> _subscribeToNewLinks.updateQuery
<i>example of how you can use gql-apollo instead of redux</i>
updateQuery: Similar to cache update prop, this function allows you to determine how the store should be updated with the information that was sent by the server after the event occurred. In fact, it follows exactly the same principle as a Redux reducer: It takes as arguments the previous state (of the query that subscribeToMore was called on) and the subscription data that’s sent by the server. You can then determine how to merge the subscription data into the existing state and return the updated data.
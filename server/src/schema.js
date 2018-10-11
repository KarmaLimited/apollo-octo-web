const { gql } = require('apollo-server');
// Basic setup with hardcoded test data

// This is a (sample) collection of books we'll be able to query
// the GraphQL server for.  A more complete example might fetch
// from an existing data source like a REST API or database.
const books = [
    {
        title: 'Harry Potter and the Chamber of Secrets',
        author: 'J.K. Rowling',
    },
    {
        title: 'Jurassic Park',
        author: 'Michael Crichton',
    },
];

const typeDefs = gql`
  # Declaration of book type
  type Book {
      title: String
      author: String
  }

  # Query
  type Query {
      books:[Book]
  }
  `;

// Resolvers defines the fetching the types in the schema.
const resolvers = {
    // retriving the books array
    Query: {
        books: () => books,
    },
};

module.exports = { typeDefs, resolvers };


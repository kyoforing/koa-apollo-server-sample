const { gql } = require('apollo-server-koa');

const authorType = gql`
  type Author implements Node {
    id: ID!
    name: String
    posts: [Post]
  }

  input AddAuthor {
    name: String!
  }

  input UpdAuthor {
    id: ID!
    name: String
  }
`;

export { authorType };

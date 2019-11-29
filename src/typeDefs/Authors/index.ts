const { gql } = require('apollo-server-koa');

const authorType = gql`
  type Author {
    author_id: ID
    name: String
  }

  input addAuthor {
    name: String!
  }

  input updAuthor {
    author_id: ID!
    name: String!
  }

  type resp {
    status: String
  }
`;

export { authorType };

  
const { gql } = require('apollo-server-koa');

const query = gql`
  type Query {
    getAuthor(author_id: Int!): Author
    getAuthors(limit: Int, page: Int): [Author]
    getPost: Post
    getReply: Reply
  }
`;

const mutation = gql`
  type Mutation {
    addAuthor(input: addAuthor): Author
    updAuthor(input: updAuthor): resp
    delAuthor(author_id: ID!): resp
  }
`;

export { query, mutation }
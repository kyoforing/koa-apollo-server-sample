  
const { gql } = require('apollo-server-koa');

const query = gql`
  type Query {
    author(author_id: Int!): Author
    authors(limit: Int, page: Int): [Author]
    post(post_id: Int!): Post
    posts(limit: Int, page: Int): [Post]
    replys: [Reply]
  }
`;

const mutation = gql`
  type Mutation {
    addAuthor(input: addAuthor): Author
    updAuthor(input: updAuthor): apiResp
    delAuthor(author_id: ID!): apiResp
    addPost(input: addPost): Post
    updPost(input: updPost): apiResp
    delPost(post_id: ID!, author_id: ID!): apiResp    
  }
`;

const publicType = gql`
  type apiResp {
    status: String
  }
`;

export { publicType, query, mutation }
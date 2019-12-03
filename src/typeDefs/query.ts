
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
    addAuthor(input: AddAuthor): Author
    updAuthor(input: UpdAuthor): apiResp
    delAuthor(id: ID!): apiResp
    addPost(input: AddPost): Post
    updPost(input: UpdPost): apiResp
    delPost(id: ID!, author_id: ID!): apiResp    
  }
`;

const publicType = gql`
  type apiResp {
    status: String
  }
`;

const publicIFace = gql`
  interface Node {
    id: ID!
  }
`;

export { publicType, publicIFace, query, mutation }
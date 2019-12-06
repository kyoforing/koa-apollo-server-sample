const { gql } = require('apollo-server-koa');

const authorType = gql`
  type Author implements Node {
    id: ID!
    "作者名稱"
    name: String @upper
    "文章列表"
    postCount: Int
    posts: [Post!]
  }

  type Authors {
    page: pagination
    list: [Author!]
  }

  type AuthorCreatePayload implements MutationResponse {
    userErrors: [UserError!]!
    author: Author
  }

  type AuthorUpdatePayload implements MutationResponse {
    userErrors: [UserError!]!
    author: Author
  }  

  type AuthorDeletePayload implements MutationResponse {
    userErrors: [UserError!]!
    status: String
  }      

  input AuthorInput {
    name: String
  }
`;

export { authorType };

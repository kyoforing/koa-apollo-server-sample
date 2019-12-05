const { gql } = require('apollo-server-koa');

const authorType = gql`
  type Author implements Node {
    id: ID!
    "作者名稱"
    name: String
    "文章列表"
    postCount: Int
    posts: [Post!]
  }

  type Authors {
    page: pagination
    list: [Author!]
  }

  type AuthorCreatePayload {
    userErrors: [UserError!]!
    author: Author
  }

  type AuthorUpdatePayload {
    userErrors: [UserError!]!
    author: Author
  }  

  type AuthorDeletePayload {
    userErrors: [UserError!]!
    status: String
  }      

  input AuthorInput {
    name: String
  }
`;

export { authorType };

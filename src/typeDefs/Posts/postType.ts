const { gql } = require('apollo-server-koa');

const postType = gql`
  type Post implements Node {
    id: ID!
    title: String
    text: String
    replies: [Reply!]
    author: Author,
    status: CollectionPostStatus
  }

  type Posts {
    page: pagination
    list: [Post!]
  }

  type PostCreatePayload {
    userErrors: [UserError!]!
    post: Post
  }

  type PostUpdatePayload {
    userErrors: [UserError!]!
    post: Post
  }

  type PostDeletePayload {
    userErrors: [UserError!]!
    status: String
  }

  input PostInput {
    title: String
    text: String
  }

  enum CollectionPostStatus {
    DRAFT
    PUBLIC
  }
`;

export { postType };


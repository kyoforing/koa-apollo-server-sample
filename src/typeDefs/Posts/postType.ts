const { gql } = require('apollo-server-koa');

const postType = gql`
  type Post implements Node {
    id: ID!
    title: String
    text: String
    replies: [Reply!]
    author: Author,
    status: CollectionPostStatus @deprecated (reason: "No longer supported")
  }

  type Posts {
    page: pagination
    list: [Post!]
  }

  type PostCreatePayload implements MutationResponse {
    userErrors: [UserError!]!
    post: Post
  }

  type PostUpdatePayload implements MutationResponse {
    userErrors: [UserError!]!
    post: Post
  }

  type PostDeletePayload implements MutationResponse {
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


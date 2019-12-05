const { gql } = require('apollo-server-koa');
const { postType, replyType } = require("./Posts");
const { authorType } = require("./Authors");

const scalar = gql`
  scalar JSON
  scalar PositiveInt
`;

const query = gql`
  type Query {
    author(author_id: ID!): Author
    authors(limit: Int, page: Int): Authors
    post(post_id: ID!): Post
    posts(limit: Int, page: Int): Posts
    replies: [Reply]
  }
`;

const mutation = gql`
  type Mutation {
    authorCreate(input: AuthorInput!): AuthorCreatePayload
    authorUpdate(author_id: ID!, input: AuthorInput!): AuthorUpdatePayload
    authorDelete(author_id: ID!): AuthorDeletePayload
    postCreate(author_id: ID!, input: PostInput!): PostCreatePayload
    postUpdate(post_id: ID!, input: PostInput!): PostUpdatePayload
    postDelete(post_id: ID!): PostDeletePayload
  }
`;

const publicType = gql`
  type UserError {
    message: String!
    field: [String!] # Path to input field which caused the error.
  }

  type pagination {
    page: Int
    pages: Int
    count: Int
    limit: PositiveInt
  }
`;

const publicIFace = gql`
  interface Node {
    id: ID!
  }
`;

const typeDefs = [query, mutation, scalar, publicIFace,
  publicType, postType, replyType, authorType];

export { typeDefs }
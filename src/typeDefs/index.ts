const { gql } = require('apollo-server-koa');
const { postType, replyType } = require("./Posts");
const { authorType } = require("./Authors");

const scalar = gql`
  scalar JSON
  scalar PositiveInt
`;

const query = gql`
  directive @upper on FIELD_DEFINITION
  directive @auth(requires: Role) on OBJECT | FIELD_DEFINITION

  type Query {
    author(author_id: ID!): Author @auth(requires: USER)
    authors(limit: Int, page: Int): Authors
    post(post_id: ID!): Post
    posts(limit: Int, page: Int): Posts
    replies: [Reply]
  }
`;

const mutation = gql`
  type Mutation {    
    authorCreate(input: AuthorInput!, token: String!): AuthorCreatePayload
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

const publicGql = gql`
  interface Node {
    id: ID!
  }

  interface MutationResponse {
    userErrors: [UserError!]!
  }

  enum Role {
    ADMIN
    REVIEWER
    USER
  }
`;

const typeDefs = [query, mutation, scalar, publicGql,
  publicType, postType, replyType, authorType];

export { typeDefs }
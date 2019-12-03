const { gql } = require('apollo-server-koa');

const postType = gql`
  type Post {
    post_id: ID
    title: String
    text: String
    replys: [Reply]
    author_id: Int
    author: Author
  }

  input addPost {
    author_id: ID!
    title: String
    text: String
  }

  input updPost {
    post_id: ID!
    author_id: ID!
    title: String
    text: String
  }  
`;

export { postType };


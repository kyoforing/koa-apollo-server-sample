const { gql } = require('apollo-server-koa');

const postType = gql`
  type Post implements Node {
    id: ID!
    title: String
    text: String
    replys: [Reply]
    author_id: Int
    author: Author
  }

  input AddPost {
    author_id: ID!
    title: String
    text: String
  }

  input UpdPost {
    id: ID!
    author_id: ID!
    title: String
    text: String
  }  
`;

export { postType };


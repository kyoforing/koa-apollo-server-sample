const { gql } = require('apollo-server-koa');

const postType = gql`
  type Post {
    post_id: ID
    content: String
    author: Author
  }  
`;

export { postType };


const { gql } = require('apollo-server-koa');

const replyType = gql`
  type Reply {
    reply_id: ID
    post_id: Int
    title: String
    text: String
    author_id: Int
    author: Author
  }
`;

export { replyType };

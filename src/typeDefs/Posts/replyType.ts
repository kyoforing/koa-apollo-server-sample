const { gql } = require('apollo-server-koa');

const replyType = gql`
  type Reply {
    reply_id: ID
    post_id: Int
    content: String
    author: Author
  }
`;

export { replyType };

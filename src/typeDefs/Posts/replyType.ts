const { gql } = require('apollo-server-koa');

const replyType = gql`
  type Reply implements Node {
    id: ID!
    title: String
    text: String
    author: Author
  }
`;

export { replyType };

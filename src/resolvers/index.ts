const { authorResolver } = require('./authorResolvers');
const { postResolver, replyResolver } = require('./postResolvers');
const { PositiveIntResolver, JSONResolver} = require('graphql-scalars');

const allResolver = {
  PositiveInt: PositiveIntResolver,
  JSON: JSONResolver,
  Node: {
    __resolveType() {
      return null; 
    }
  }
}

const resolvers = [allResolver, authorResolver, postResolver, replyResolver];

export { resolvers }
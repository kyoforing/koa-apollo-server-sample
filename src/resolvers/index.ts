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
  },
  MutationResponse: {
    __resolveType() {
      return null; 
    }
  },
  FullSearchResult: {
    __resolveType(obj) {
      if (obj.name) return 'Author';
      if (obj.title || obj.text) return 'Post';

      return null;
    }
  }
}

const resolvers = [allResolver, authorResolver, postResolver, replyResolver];

export { resolvers }
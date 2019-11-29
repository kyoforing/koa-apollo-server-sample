const { authorResolver } = require('./authorResolvers');
const { postResolver, replyResolver } = require('./postResolvers');

const resolvers = [authorResolver, postResolver, replyResolver];

export { resolvers }
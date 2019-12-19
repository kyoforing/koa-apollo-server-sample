const { getAuthor, getAuthors, createAuthor, updateAuthor, deleteAuthor } = require('../models/authorModel');
const { getPosts } = require('../models/postModel');

const authorResolver = {
  Query: {
    author: (_parent, { author_id }) => getAuthor(author_id), //Promise or Object
    authors: (_parent, { limit, page }) => getAuthors(limit, page),
    search: async (_parent, { text }) => {
      let authors = await getAuthors(0, 0, text);
      let posts = await getPosts(0, 0, text);
      let result = authors.list.concat(posts.list);

      return result;
    }
  },
  Mutation: {
    authorCreate: (_parent, { input }) => createAuthor(input),
    authorUpdate: (_parent, { author_id, input }) => updateAuthor(author_id, input),
    authorDelete: (_parent, { author_id }) => deleteAuthor(author_id),
  }
};

export { authorResolver }
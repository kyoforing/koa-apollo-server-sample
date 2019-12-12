const { getAuthor, getAuthors, createAuthor, updateAuthor, deleteAuthor } = require('../models/authorModel');

const authorResolver = { 
  Query: {
    author: (_parent, { author_id }) => getAuthor(author_id), //Promise or Object
    authors: (_parent, { limit, page }) => getAuthors(limit, page),
  },
  Mutation: {
    authorCreate: (_parent, { input }) => createAuthor(input),
    authorUpdate: (_parent, { author_id, input} ) => updateAuthor(author_id, input),
    authorDelete: (_parent, { author_id }) => deleteAuthor(author_id),
  }
};

export { authorResolver }
const { getAuthor, getAuthors, createAuthor, updateAuthor, deleteAuthor } = require('../models/authorModel');

const authorResolver = { 
  Query: {
    author: (_source, { author_id }) => getAuthor(author_id), //Promise or Object
    authors: (_source, { limit, page }) => getAuthors(limit, page),
  },
  Mutation: {
    authorCreate: (_source, { input }) => createAuthor(input),
    authorUpdate: (_source, { author_id, input} ) => updateAuthor(author_id, input),
    authorDelete: (_source, { author_id }) => deleteAuthor(author_id),
  }
};

export { authorResolver }
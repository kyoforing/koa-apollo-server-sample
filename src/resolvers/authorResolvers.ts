const { getAuthor, getAuthors, addAuthor, updAuthor, delAuthor } = require('../models/authorModel');

const authorResolver = {
  Query: {
    getAuthor: (_source, { author_id }) => getAuthor(author_id), //Promise or Object
    getAuthors: (_source, { limit, page }) => getAuthors(limit, page),
  },
  Mutation: {
    addAuthor: (_source, args) => addAuthor(args),
    updAuthor: (_source, args) => updAuthor(args),
    delAuthor: (_source, { author_id }) => delAuthor(author_id),
  },
};

export { authorResolver }
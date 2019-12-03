const { getAuthor, getAuthors, addAuthor, updAuthor, delAuthor } = require('../models/authorModel');
const DataLoader = require('dataloader');

const authorResolver = { 
  Query: {
    author: (_source, { id }) => getAuthor(id), //Promise or Object
    authors: (_source, { limit, page }) => getAuthors(limit, page),
  },
  Mutation: {
    addAuthor: (_source, args) => addAuthor(args),
    updAuthor: (_source, args) => updAuthor(args),
    delAuthor: (_source, { id }) => delAuthor(id),
  }
};

export { authorResolver }
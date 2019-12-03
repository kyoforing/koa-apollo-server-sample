const { getAuthor } = require('../models/authorModel');
const { getPost, getPosts, addPost, updPost, delPost, getReply, getPostsByAuthor } = require('../models/postModel');
const DataLoader = require('dataloader');

const loaders = {
  postsByAuthor: new DataLoader(getPostsByAuthor),
};

const postResolver = {
  Query: {
    post: (_source, { id }) => getPost(id), //Promise or Object
    posts: (_source, { limit, page }) => getPosts(limit, page),
  },
  Mutation: {
    //DataLoader
    addPost: (_source, args) => {
      loaders.postsByAuthor.clear(+args.input.author_id);
      return addPost(args)
    },
    updPost: (_source, args) => {
      loaders.postsByAuthor.clear(+args.input.author_id);
      return updPost(args)
    },
    delPost: (_source, { id, author_id }) => {
      loaders.postsByAuthor.clear(+author_id);
      return delPost(id)
    },
  },
  Post: {
    author: (obj) => getAuthor(obj.author_id),
    replys: (obj) => getReply(obj.author_id),
  },
  Author : {
    //posts: (obj) => getPostsByAuthor(obj.author_id),
    posts: (obj) => loaders.postsByAuthor.load(obj.id)   //For DataLoader
  }
};

const replyResolver = {
  Query: {
    replys: (_source, args) => getReply(args),
  },
  Reply: {
    author: (obj) => getAuthor(obj.id),
  }
};

export { postResolver, replyResolver }
const { getAuthor } = require('../models/authorModel');
const { getPost, getPosts, createPost, updatePost, deletePost, getReplies, getPostsByAuthor, getPostCountByAuthor } = require('../models/postModel');
const DataLoader = require('dataloader');

const loaders = {
  postsByAuthor: new DataLoader(getPostsByAuthor),
  postCountByAuthor: new DataLoader(getPostCountByAuthor),
};

const postResolver = {
  Query: {
    post: (_source, { post_id }) => getPost(post_id), //Promise or Object
    posts: (_source, { limit, page }) => getPosts(limit, page),
  },
  Mutation: {
    postCreate: (_source, { author_id, input }) => {
      loaders.postsByAuthor.clear(+author_id); //Clear DataLoader cache
      loaders.postCountByAuthor.clear(+author_id); //Clear DataLoader cache
      return createPost(author_id, input)
    },
    postUpdate: async (_source, { post_id, input }) => {
      let currPost = await getPost(post_id);

      if (currPost) {
        loaders.postsByAuthor.clear(+currPost.author_id); //Clear DataLoader cache
        loaders.postCountByAuthor.clear(+currPost.author_id); //Clear DataLoader cache
      }

      return updatePost(post_id, input);
    },
    postDelete: async (_source, { post_id }) => {
      let currPost = await getPost(post_id);

      if (currPost) {
        loaders.postsByAuthor.clear(+currPost.author_id); //Clear DataLoader cache
        loaders.postCountByAuthor.clear(+currPost.author_id); //Clear DataLoader cache
      }

      return deletePost(post_id);
    },
  },
  Post: {
    author: (obj) => getAuthor(obj.author_id),
    replies: (obj) => getReplies(obj.id),
  },
  Author: {
    postCount: (obj) => loaders.postCountByAuthor.load(obj.id),
    posts: (obj) => loaders.postsByAuthor.load(obj.id)   //Load DataLoader cache
    //posts: (obj) => getPostsByAuthor(obj.author_id),
  }
};

const replyResolver = {
  Query: {
    replies: (_source) => getReplies(),
  },
  Reply: {
    author: (obj) => getAuthor(obj.id),
  }
};

export { postResolver, replyResolver }
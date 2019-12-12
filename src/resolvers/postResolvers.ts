const { getAuthor } = require('../models/authorModel');
const { getPost, getPosts, createPost, updatePost, deletePost, getReplies, getPostsByAuthor, getPostCountByAuthor } = require('../models/postModel');
const DataLoader = require('dataloader');

const loaders = {
  postsByAuthor: new DataLoader(getPostsByAuthor),
  postCountByAuthor: new DataLoader(getPostCountByAuthor),
};

const postResolver = {
  Query: {
    post: (_parent, { post_id }) => getPost(post_id), //Promise or Object
    posts: (_parent, { limit, page }) => getPosts(limit, page),
  },
  Mutation: {
    postCreate: (_parent, { author_id, input }) => {
      loaders.postsByAuthor.clear(+author_id); //Clear DataLoader cache
      loaders.postCountByAuthor.clear(+author_id); //Clear DataLoader cache
      return createPost(author_id, input)
    },
    postUpdate: async (_parent, { post_id, input }) => {
      let currPost = await getPost(post_id);

      if (currPost) {
        loaders.postsByAuthor.clear(+currPost.author_id); //Clear DataLoader cache
        loaders.postCountByAuthor.clear(+currPost.author_id); //Clear DataLoader cache
      }

      return updatePost(post_id, input);
    },
    postDelete: async (_parent, { post_id }) => {
      let currPost = await getPost(post_id);

      if (currPost) {
        loaders.postsByAuthor.clear(+currPost.author_id); //Clear DataLoader cache
        loaders.postCountByAuthor.clear(+currPost.author_id); //Clear DataLoader cache
      }

      return deletePost(post_id);
    },
  },
  Post: {
    author: (_parent) => getAuthor(_parent.author_id),
    replies: (_parent) => getReplies(_parent.id),
  },
  Author: {
    postCount: (_parent) => loaders.postCountByAuthor.load(_parent.id),
    posts: (_parent) => loaders.postsByAuthor.load(_parent.id)   //Load DataLoader cache
    //posts: (obj) => getPostsByAuthor(obj.author_id),
  }
};

const replyResolver = {
  Query: {
    replies: (_parent) => getReplies(),
  },
  Reply: {
    author: (_parent) => getAuthor(_parent.id),
  }
};

export { postResolver, replyResolver }
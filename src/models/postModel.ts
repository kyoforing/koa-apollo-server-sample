const { knex } = require('../config/knexfile');
const { filter, isArray } = require('lodash');

const getPost = async post_id => {
  let postsSql = knex('posts')
    .select({ id: 'post_id' })
    .select('author_id')
    .select('title')
    .select('text')
    .select('status')
    .where('post_id', post_id);

  let post = await postsSql
    .then(rows => rows.length > 0 ? rows[0] : null)
    .catch(error => { throw error });
  return post;
};

const getPosts = async (limit = 10, page = 1, text) => {
  let postsSql = knex('posts')
    .select(knex.raw('count(1) AS count'));

  if (text) postsSql.whereRaw(`title like '%${text}%' OR text like '%${text}%'`);
  
  let postCount = await postsSql
    .then(rows => rows.length > 0 ? rows[0].count : 0)
    .catch(error => { throw error });

  let pageInfo = {
    page,
    pages: 0,
    limit,
    count: postCount
  };

  pageInfo.pages = Math.ceil(postCount / limit);
  page = page > pageInfo.pages ? pageInfo.pages : page
  let offset: Number = page > 0 ? (page - 1) * limit : 0;

  postsSql
    .clearSelect()
    .select({ id: 'post_id' })
    .select('author_id')
    .select('title')
    .select('text')
    .select('status')

  if (limit) postsSql.limit(limit).offset(offset);

  let posts = await postsSql
    .then(rows => rows)
    .catch(error => { throw error });

  let result = {
    page: pageInfo,
    list: posts
  }

  return result;
};

const createPost = async (author_id, input) => {
  const { title, text } = input;
  const post = { author_id, title, text };
  const result = {
    userErrors: [],
    post: null
  };

  const addPostSql = knex('posts')
    .insert(post);

  let id = await addPostSql
    .then(rows => (rows.length > 0 ? rows[0] : null))
    .catch(error => { throw error });

  result.post = { id, title, text };

  return result;
};

const updatePost = async (post_id, input) => {
  const { title, text } = input;
  const result = {
    userErrors: [],
    post: { id: post_id, title, text }
  };


  const updPostSql = knex('posts')
    .where('post_id', post_id);

  if (title !== undefined) updPostSql.update('title', title);
  if (text !== undefined) updPostSql.update('text', text);

  let updPostRlt = await updPostSql
    .then(rows => rows)
    .catch(error => { throw error });

  if (!updPostRlt) {
    result.userErrors.push({ message: 'no data', field: ['post_id'] });
    result.post = null;
  }

  return result;
};

const deletePost = async post_id => {
  const result = {
    userErrors: [],
    status: 'success'
  };

  const delpostSql = knex('posts')
    .delete()
    .where('post_id', post_id)
    .then(rows => rows);

  let delPostRlt = await delpostSql
    .then(rows => rows)
    .catch(error => { throw error });

  if (!delPostRlt) {
    result.userErrors.push({ message: 'no data', field: ['post_id'] });
    result.status = 'failed';
  }

  return result;
};

const getReplies = post_id => {
  let reply: any = [{
    id: 1,
    post_id: 1,
    title: 'test reply 1 title',
    text: 'test reply 1 text',
    author_id: 1
  },
  {
    id: 2,
    post_id: 1,
    title: 'test reply 2 title',
    text: 'test reply 2 text',
    author_id: 2
  },
  {
    id: 3,
    post_id: 2,
    title: 'test reply 3 title',
    text: 'test reply 3 text',
    author_id: 2
  }];

  if (+post_id) reply = filter(reply, ['post_id', post_id]);

  return reply;
}

const getPostsByAuthor = async (author_id: Array<number>) => {
  let postsSql = knex('posts')
    .select({ id: 'post_id' })
    .select('author_id')
    .select('title')
    .select('text')
    .orderBy('author_id')
    .whereIn('author_id', author_id);

  let post = await postsSql
    .then(rows => {
      console.log(`getPostsByAuthor, author_id: ${author_id}`);
      return rows
    })
    .catch(error => { throw error });

  post = author_id.map(id => filter(post, ['author_id', id]));  // DataLoader

  return post;
};

const getPostCountByAuthor = async (author_id: Array<number>) => {
  let result = [];
  let postsSql = knex('posts')
    .select('author_id')
    .count('post_id as count')
    .whereIn('author_id', author_id)
    .groupBy('author_id')
    .orderBy('author_id');

  let post = await postsSql
    .then(rows => {
      console.log(`getPostCountByAuthor, author_id: ${author_id}`);
      return rows
    })
    .catch(error => { throw error });

  author_id.forEach(id => {
    let obj = filter(post, ['author_id', id]);
    result.push(obj.length > 0 ? obj[0].count : 0);
  });

  return result;
};

export { getPost, getPosts, createPost, updatePost, deletePost, getPostsByAuthor, getPostCountByAuthor, getReplies }
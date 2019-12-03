const { knex } = require('../config/knexfile');
const { filter, isArray } = require('lodash');

const getPost = async post_id => {
  let postsSql = knex('posts')
    .select({ id: 'post_id'})
    .select('author_id')
    .select('title')
    .select('text')
    .where('post_id', post_id);

  let post = await postsSql
    .then(rows => rows.length > 0 ? rows[0] : {})
    .catch(error => { throw error });
  return post;
};

const getPosts = async (limit = 10, page = 1) => {
  let postsSql = knex('posts')
    .select(knex.raw('count(1) AS count'));
  let postCount = await postsSql
    .then(rows => rows.length > 0 ? rows[0].count : 0)
    .catch(error => { throw error });

  let pages = Math.ceil(postCount / limit);
  page = page > pages ? pages : page
  let offset = page > 0 ? (page - 1) * limit : 0;

  postsSql
    .clearSelect()
    .select({ id: 'post_id'})
    .select('author_id')
    .select('title')
    .select('text')
    .limit(limit)
    .offset(offset);

  let posts = await postsSql
    .then(rows => rows)
    .catch(error => { throw error });
  return posts;
};

const addPost = async args => {
  const { author_id, title, text } = args.input;
  const post = { author_id, title, text };

  const addPostSql = knex('posts')
    .insert(post);

  let id = await addPostSql
    .then(rows => (rows.length > 0 ? rows[0] : null))
    .catch(error => { throw error });
  let result = { id, title, text };

  return result;
};

const updPost = async args => {
  const { id, title, text } = args.input;

  const updPostSql = knex('posts')
    .where('post_id', id);

  if (title !== undefined) updPostSql.update('title', title);
  if (text !== undefined) updPostSql.update('text', text);

  let updPostRlt = await updPostSql
    .then(rows => rows)
    .catch(error => { throw error });
  let result = { status: updPostRlt ? 'success' : 'no affected' };

  return result;
};

const delPost = async id => {
  const delpostSql = knex('posts')
    .delete()
    .where('post_id', id)
    .then(rows => rows);

  let delpostRlt = await delpostSql
    .then(rows => rows)
    .catch(error => { throw error });
  let result = { status: delpostRlt ? 'success' : 'no affected' };

  return result;
};

const getReply = post_id => {
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

const getPostsByAuthor = async author_id => {
  let postsSql = knex('posts')
    .select({ id: 'post_id'})
    .select('author_id')
    .select('title')
    .select('text')
    .orderBy('author_id');

  if (isArray(author_id)) postsSql.whereIn('author_id', author_id);
  else postsSql.where('author_id', author_id);

  let post = await postsSql
    .then(rows => {
      console.log(`getPostsByAuthor, author_id: ${author_id}`);
      return rows
    })
    .catch(error => { throw error });

  if (isArray(author_id)) {
    post = author_id.map(id => filter(post, ['author_id', id]));  // DataLoader
  }

  return post;
};

export { getPost, getPosts, addPost, updPost, delPost, getPostsByAuthor, getReply }
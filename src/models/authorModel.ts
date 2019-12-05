const { knex } = require('../config/knexfile');

const getAuthor = async author_id => {
  let authorsSql = knex('authors')
    .select({ id: 'author_id' })
    .select('name')
    .where('author_id', author_id);

  let author = await authorsSql
    .then(rows => rows.length > 0 ? rows[0] : null)
    .catch(error => { throw error });
  return author;
};

const getAuthors = async (limit = 10, page = 1) => {
  let authorsSql = knex('authors')
    .select(knex.raw('count(1) AS count'));
  let authorCount = await authorsSql
    .then(rows => rows.length > 0 ? rows[0].count : 0)
    .catch(error => { throw error });
  let pageInfo = {
    page,
    pages: 0,
    limit,
    count: authorCount
  };

  pageInfo.pages = Math.ceil(authorCount / limit);
  page = page > pageInfo.pages ? pageInfo.pages : page
  let offset: Number = page > 0 ? (page - 1) * limit : 0;

  authorsSql
    .clearSelect()
    .select({ id: 'author_id' })
    .select('name')
    .limit(limit)
    .offset(offset);

  let authors = await authorsSql
    .then(rows => rows)
    .catch(error => { throw error });

  let result = {
    page: pageInfo,
    list: authors
  }

  return result;
};

const createAuthor = async input => {
  const { name } = input;
  const author = { name };
  const result = {
    userErrors: [],
    author: null
  };

  const addAuthorSql = knex('authors')
    .insert(author);

  const id = await addAuthorSql
    .then(rows => (rows.length > 0 ? rows[0] : null))
    .catch(error => { throw error });

  result.author = { id, name };

  return result;
};

const updateAuthor = async (author_id, input) => {
  const { name } = input;
  const result = {
    userErrors: [],
    author: { id: author_id, name }
  };

  const updAuthorSql = knex('authors')
    .update('name', name)
    .where('author_id', author_id)

  let updAuthorRlt = await updAuthorSql
    .then(rows => rows)
    .catch(error => { throw error });

  if (!updAuthorRlt) {
    result.userErrors.push({ message: 'no data', field: ['author_id'] });
    result.author = null;
  }

  return result;
};

const deleteAuthor = async author_id => {
  const result = {
    userErrors: [],
    status: 'success'
  };

  const delAuthorSql = knex('authors')
    .delete()
    .where('author_id', author_id)
    .then(rows => rows);

  let delAuthorRlt = await delAuthorSql
    .then(rows => rows)
    .catch(error => { throw error });

  if (!delAuthorRlt) {
    result.userErrors.push({ message: 'no data', field: ['author_id'] });
    result.status = 'failed';
  }

  return result;
};

export { getAuthor, getAuthors, createAuthor, updateAuthor, deleteAuthor }
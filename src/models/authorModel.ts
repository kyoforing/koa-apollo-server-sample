const { knex } = require('../config/knexfile');

const getAuthor = async author_id => {
  let authorsSql = knex('authors')
    .select({ id: 'author_id'})
    .select('name')
    .where('author_id', author_id);

  let author = await authorsSql
    .then(rows => rows.length > 0 ? rows[0] : {})
    .catch(error => { throw error });
  return author;
};

const getAuthors = async (limit = 10, page = 1) => {
  let authorsSql = knex('authors')
    .select(knex.raw('count(1) AS count'));
  let authorCount = await authorsSql
    .then(rows => rows.length > 0 ? rows[0].count : 0)
    .catch(error => { throw error });

  let pages = Math.ceil(authorCount / limit);
  page = page > pages ? pages : page
  let offset = page > 0 ? (page - 1) * limit : 0;

  authorsSql
    .clearSelect()
    .select({ id: 'author_id'})
    .select('name')
    .limit(limit)
    .offset(offset);

  let authors = await authorsSql
    .then(rows => rows)
    .catch(error => { throw error });
  return authors;
};

const addAuthor = async args => {
  const { name } = args.input;
  const author = { name };

  const addAuthorSql = knex('authors')
    .insert(author);

  let id = await addAuthorSql
    .then(rows => (rows.length > 0 ? rows[0] : null))
    .catch(error => { throw error });
  let result = { id, name };

  return result;
};

const updAuthor = async args => {
  const { id, name } = args.input;

  const updAuthorSql = knex('authors')
    .update('name', name)
    .where('author_id', id)

  let updAuthorRlt = await updAuthorSql
    .then(rows => rows)
    .catch(error => { throw error });
  let result = { status: updAuthorRlt ? 'success' : 'no affected' };

  return result;
};

const delAuthor = async id => {
  const delAuthorSql = knex('authors')
    .delete()
    .where('author_id', id)
    .then(rows => rows);

  let delAuthorRlt = await delAuthorSql
    .then(rows => rows)
    .catch(error => { throw error });
  let result = { status: delAuthorRlt ? 'success' : 'no affected' };

  return result;
};

export { getAuthor, getAuthors, addAuthor, updAuthor, delAuthor }
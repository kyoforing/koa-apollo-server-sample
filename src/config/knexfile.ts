const knex_module = require('knex');

const config = {
  client: 'mysql',
  connection: {
    host: process.env.MYSQL_URL,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQL_PORT,
  },
  pool: {
    min: 0,
    max: 20,
  },
};

const knex = knex_module(config);

export { knex }
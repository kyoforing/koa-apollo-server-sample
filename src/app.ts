'use strict';

const Koa = require('koa');
const helmet = require('koa-helmet');
const dotenv = require('dotenv');
const { ApolloServer, gql } = require('apollo-server-koa');
const { gqlLogger, userLogger } = require('./lib/logger');
const { cors } = require('./lib/cors');

const env = process.env.NODE_ENV || 'development';
const app = new Koa();

dotenv.config({ path: `.env.${env}` });

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    hello: String
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: () => 'Hello world!',
  },
};

// API Logger
app.use(userLogger());

// CORS
app.use(cors());

// Security setting
app.use(helmet());
app.use(helmet.noCache());
app.use(async (ctx, next) => {
    ctx.set('Strict-Transport-Security', 'max-age=15552000');
    await next();
});

// Init GraphQL Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  extensions: [() => new gqlLogger()],
});

server.applyMiddleware({ app });
app.listen({ port: 8080 }, () =>
  console.log(`🚀 Server ready at http://localhost:8080${server.graphqlPath}`)
);
